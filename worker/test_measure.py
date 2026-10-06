import unittest
from unittest.mock import patch
from measure import cpu_seconds, process_sample, host_info, ProcessMonitor


class MeasurementTest(unittest.TestCase):
    def test_ps_cpu_formats_mac_and_linux(self):
        self.assertAlmostEqual(cpu_seconds('01:02.50'), 62.5)
        self.assertEqual(cpu_seconds('01:02:03'), 3723)
        self.assertEqual(cpu_seconds('2-01:02:03'), 176523)

    def test_process_rss_is_bytes_and_name_has_no_arguments(self):
        with patch('measure.command', return_value='42 123456 01:02.50 /srv/kobun runtime/llama-server'):
            value = process_sample(42)
        self.assertEqual(value['rss_bytes'], 123456*1024)
        self.assertEqual(value['cpu_seconds'], 62.5)
        self.assertEqual(value['executable'], 'llama-server')

    def test_missing_pid_not_reported_as_zero_memory(self):
        with patch('measure.command', return_value=''):
            self.assertIsNone(process_sample(42))
        with patch('measure.process_sample', return_value=None):
            with self.assertRaises(ValueError): ProcessMonitor(42).start()


if __name__ == '__main__': unittest.main()
