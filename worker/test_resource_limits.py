"""Resources, authorization, persistence/rollback and admission; no system changes."""
import json
from pathlib import Path
from types import SimpleNamespace
import tempfile
import unittest
from unittest.mock import patch
import resource_limits as limits
import resource_control as helper
from control_server import ServiceControl
from install_resources import units

HOST = {'cpus': 64, 'memory_total_mib': 256*1024, 'memory_available_mib': 160*1024}
CAP = {'cpu_quota': 200, 'memory_max_mib': 48*1024}

class RecommendationTest(unittest.TestCase):
    def test_models_and_small_or_memory_busy_hosts(self):
        for model, mib in limits.MODEL_MEMORY.items():
            self.assertEqual(limits.recommended(HOST, model), dict(CAP, memory_max_mib=mib))
        small = {'cpus': 2, 'memory_total_mib': 8*1024, 'memory_available_mib': 6*1024}
        self.assertEqual(limits.recommended(small, 'qwen35-35b-a3b-q4km'), {'cpu_quota': 100, 'memory_max_mib': 2048})
        busy = dict(HOST, cpus=.5, memory_available_mib=1024)
        self.assertEqual(limits.recommended(busy, 'qwen35-9b-q4km'), {'cpu_quota': 25, 'memory_max_mib': 512})
        with self.assertRaises(ValueError): limits.recommended(dict(HOST, memory_available_mib=128))

    def test_parent_cgroup_allocation_is_respected(self):
        def read(path):
            mapping = {'/proc/meminfo': 'MemTotal: 268435456 kB\nMemAvailable: 167772160 kB\n',
                '/sys/fs/cgroup/container/cpu.max': '150000 100000',
                '/sys/fs/cgroup/container/memory.max': str(8*1024*limits.MIB),
                '/sys/fs/cgroup/container/memory.current': str(2*1024*limits.MIB)}
            if str(path) not in mapping: raise OSError()
            return mapping[str(path)]
        with patch.object(Path, 'read_text', read), patch('resource_limits.os.cpu_count', return_value=64):
            h = limits.host_resources(Path('/sys/fs/cgroup/container'))
        self.assertEqual(h['cpus'], 1.5)
        self.assertEqual(h['memory_total_mib'], 8192)
        self.assertEqual(h['memory_available_mib'], 6144)
        self.assertEqual(limits.recommended(h), {'cpu_quota': 75, 'memory_max_mib': 2048})

    def test_rejects_forged_limits_and_extraneous_properties(self):
        for value in [None, {}, dict(CAP, unit='httpd.service'), dict(CAP, cpu_quota=True),
            dict(CAP, cpu_quota=0), dict(CAP, memory_max_mib='49152'), dict(CAP, memory_max_mib=257)]:
            with self.subTest(value=value), self.assertRaises(ValueError): limits.validate(value)

    def test_linux_only_no_false_enforcement_on_macos(self):
        with patch('resource_limits.sys.platform', 'darwin'):
            self.assertFalse(limits.status()['supported'])
        with patch('resource_limits.sys.platform', 'linux'), patch('resource_limits.request', side_effect=OSError()):
            self.assertFalse(limits.status()['supported'])

    def test_unix_socket_and_root_owned_code_remain_narrow(self):
        text = units(Path('/opt/backend/worker'), 'kobunocr')
        self.assertIn('SocketMode=0600', text['kobun-ocr-resources.socket'])
        self.assertIn('SocketUser=kobunocr', text['kobun-ocr-resources.socket'])
        self.assertIn('/usr/bin/python3 -I', text['kobun-ocr-resources.service'])
        self.assertIn('RestrictAddressFamilies=AF_UNIX', text['kobun-ocr-resources.service'])
        self.assertNotIn('sudo', ''.join(text.values()))

class HelperTest(unittest.TestCase):
    def state(self, policy=CAP, current=16*1024):
        return {'applied': policy.copy(), 'host': HOST.copy(), 'memory_current_mib': current}

    def test_fixed_unit_persistent_multi_property_update(self):
        new = dict(CAP, cpu_quota=150)
        with patch('resource_control.snapshot', side_effect=[self.state(), self.state(new)]), patch('resource_control.subprocess.run') as run:
            self.assertEqual(helper.handle({'action': 'apply', 'policy': new})['applied'], new)
        command = run.call_args[0][0]
        self.assertEqual(command, ['/usr/bin/systemctl', 'set-property', limits.UNIT,
            'CPUQuota=150%', 'MemoryMax=51539607552', 'MemorySwapMax=0'])
        self.assertNotIn('--runtime', command)

    def test_foreign_unit_and_host_overallocation_never_execute(self):
        for body in [{'action': 'apply', 'policy': CAP, 'unit': 'httpd.service'},
            {'action': 'stop'}, {'action': 'apply', 'policy': dict(CAP, memory_max_mib=512*1024)}]:
            with self.subTest(body=body), patch('resource_control.snapshot', return_value=self.state()), patch('resource_control.subprocess.run') as run:
                with self.assertRaises(ValueError): helper.handle(body)
                run.assert_not_called()

    def test_low_memory_refused_without_running_a_command(self):
        with patch('resource_control.snapshot', return_value=self.state()), patch('resource_control.subprocess.run') as run:
            with self.assertRaises(ValueError): helper.handle({'action': 'apply', 'policy': dict(CAP, memory_max_mib=16*1024)})
            run.assert_not_called()

    def test_failed_confirmation_restores_previous_limits(self):
        with patch('resource_control.snapshot', side_effect=[self.state(), self.state(), self.state()]), patch('resource_control.subprocess.run') as run:
            with self.assertRaisesRegex(RuntimeError, '前の上限'): helper.handle({'action': 'apply', 'policy': dict(CAP, cpu_quota=150)})
        self.assertEqual(run.call_count, 2)
        self.assertIn('CPUQuota=200%', run.call_args[0][0])

    def test_failed_rollback_reports_need_to_check_actual_limits(self):
        with patch('resource_control.snapshot', side_effect=[self.state(), self.state(), self.state(dict(CAP, cpu_quota=175))]), patch('resource_control.subprocess.run'):
            with self.assertRaisesRegex(RuntimeError, 'サーバ管理者'):
                helper.handle({'action': 'apply', 'policy': dict(CAP, cpu_quota=150)})

    def test_inactive_unit_quota_is_read_from_systemd(self):
        with patch('resource_control.properties', return_value={'LoadState':'loaded','ControlGroup':'',
            'CPUQuotaPerSecUSec':'1min 4s','MemoryMax':str(48*1024*limits.MIB)}), \
            patch('resource_control.host_resources', return_value=HOST), patch.object(Path, 'read_text', side_effect=OSError()):
            self.assertEqual(helper.snapshot()['applied'], dict(CAP, cpu_quota=6400))

    def test_peer_uid_check_precedes_parsing_and_privileged_actions(self):
        import struct
        connection = SimpleNamespace(settimeout=lambda _:None, getsockopt=lambda *args:struct.pack('3i',123,999,999),
            sendall=lambda data:setattr(self,'response',json.loads(data)))
        with patch('resource_control.handle') as handle, patch('resource_control.socket.SO_PEERCRED', 17, create=True):
            helper.serve_connection(connection,1000)
            handle.assert_not_called()
        self.assertFalse(self.response['ok'])

class SupervisorTest(unittest.TestCase):
    def setUp(self):
        import threading
        self.control = ServiceControl.__new__(ServiceControl)
        self.control.lock=threading.Lock();self.control.operation=None
        self.state={'worker':{'running':True,'pending':0},'llama':{'running':True},
                    'resources':dict(supported=True,applied=CAP.copy())}

    def apply(self, policy):
        with patch.object(self.control,'status',return_value=self.state), patch.object(self.control,'_freeze_worker',return_value=True) as freeze, \
            patch.object(self.control,'_resume_worker') as resume, patch('control_server.resource_limits.apply') as apply:
            self.control.set_resources(policy,'token')
            return freeze, resume, apply

    def test_idle_cpu_changes_resume_admission(self):
        _, resume, apply = self.apply(dict(CAP,cpu_quota=150))
        apply.assert_called_once();resume.assert_called_once();self.assertIsNone(self.control.operation)

    def test_pending_and_memory_reduction_leave_processes_untouched(self):
        for pending, policy in [(1,dict(CAP,cpu_quota=150)),(0,dict(CAP,memory_max_mib=42*1024))]:
            self.state['worker']['pending']=pending
            with patch.object(self.control,'status',return_value=self.state),patch('control_server.resource_limits.apply') as apply:
                with self.assertRaises(RuntimeError):self.control.set_resources(policy,'token')
                apply.assert_not_called();self.assertFalse(self.control.lock.locked())

    def test_stopped_services_can_lower_memory(self):
        self.state['worker']['running']=self.state['llama']['running']=False
        _, _, apply=self.apply(dict(CAP,memory_max_mib=42*1024));apply.assert_called_once()

if __name__=='__main__':unittest.main()
