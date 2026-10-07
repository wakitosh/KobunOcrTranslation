import json
import io
import tempfile
from pathlib import Path
import unittest
from urllib.error import HTTPError, URLError
from unittest.mock import patch
from translation_policy import parse_translation, sampling_settings, check_text, REVISION, TEXT_REVISION, TEXT_PROMPT
from engine import translate, local_json


class TranslationPolicyTest(unittest.TestCase):
    def test_local_connection_failure_is_actionable_without_retry(self):
        for error in [URLError(ConnectionRefusedError(61, 'Connection refused')), TimeoutError('timed out')]:
            with self.subTest(error=type(error).__name__), patch('engine.urllib.request.urlopen', side_effect=error) as call:
                with self.assertRaisesRegex(ValueError, '翻訳サーバに接続できません') as result:
                    local_json('http://local', '/apply-template', {'messages': []})
                self.assertIs(result.exception.__cause__, error)
                self.assertEqual(call.call_count, 1)

    def test_http_error_remains_available_for_diagnostics(self):
        error = HTTPError('http://local', 500, 'format', {}, io.BytesIO(b'{"error":"template format"}'))
        with patch('engine.urllib.request.urlopen', side_effect=error):
            with self.assertRaises(HTTPError) as result:
                local_json('http://local', '/v1/chat/completions', {})
            self.assertIs(result.exception, error)

    def test_uncertainty_is_tied_to_exact_input(self):
        raw = '夜はやこもなを、ほたるとびちがひたる。'
        content = {'translation': '夜は［判読困難］、蛍が飛び交っている。',
            'uncertainties': [{'source': 'やこもなを', 'reason': '読みを確定できない。', 'reading': '闇もなほ'}]}
        text, notes, warnings, _ = parse_translation(json.dumps(content), raw)
        self.assertIn('蛍が飛び交っている', text)
        self.assertEqual(notes[0]['source'], 'やこもなを')
        self.assertTrue(warnings)
        content['uncertainties'][0]['source'] = '原文にない語句'
        with self.assertRaisesRegex(ValueError, '入力本文にない'): parse_translation(json.dumps(content), raw)

    def test_copied_text_is_not_accepted_as_translation(self):
        raw = '月いとあかし。風いと涼し。虫の音などあはれなり。昔を思ひ出でて、心もとなく夜を明かしにけり。'
        with self.assertRaisesRegex(ValueError, '現代語訳として採用しません'):
            parse_translation(json.dumps({'translation': raw, 'uncertainties': []}), raw)

    def test_invalid_or_unexpected_json_is_rejected(self):
        for value in ['not json', '[]', '{}', '{"translation":1,"uncertainties":[]}', '{"translation":"訳","uncertainties":[{}]}']:
            with self.subTest(value=value), self.assertRaises(ValueError): parse_translation(value, '原文')

    def test_legacy_prompts_also_reject_copied_output(self):
        raw = '月いとあかし。風いと涼し。虫の音などあはれなり。昔を思ひ出でて、心もとなく夜を明かしにけり。'
        response = {'choices': [{'finish_reason': 'stop', 'message': {'content': raw}}]}
        for revision in range(1, 4):
            with self.subTest(revision=revision), tempfile.TemporaryDirectory() as tmp, patch('engine.local_json', side_effect=[{'prompt':'p'}, {'tokens':[1]}, response]):
                with self.assertRaisesRegex(ValueError, '現代語訳として採用しません'):
                    translate({'lines':[{'id':'a','raw':raw}], 'run_dir':tmp}, {'llm_url':'http://local','llm_model':'test','prompt_revision':f'kobun-ja-translation-{revision}'})
                self.assertEqual(json.loads((Path(tmp)/'llm-response.json').read_text()), response)

    def test_request_and_response_remain_available_when_copy_rejected(self):
        raw = '月いとあかし。風いと涼し。虫の音などあはれなり。昔を思ひ出でて、心もとなく夜を明かしにけり。'
        response = {'choices': [{'finish_reason': 'stop', 'message': {'content': json.dumps({'translation': raw, 'uncertainties': []})}}]}
        with tempfile.TemporaryDirectory() as tmp, patch('engine.local_json', side_effect=[{'prompt':'p'}, {'tokens':[1]}, response]) as call:
            with self.assertRaisesRegex(ValueError, '採用しません'):
                translate({'lines':[{'id':'a','raw':raw}], 'run_dir':tmp}, {'llm_url':'http://local','llm_model':'test','prompt_revision':REVISION})
            request = json.loads((Path(tmp)/'llm-request.json').read_text())
            self.assertEqual(request['response_format']['type'], 'json_schema')
            self.assertEqual(request['temperature'], 0.2)
            self.assertEqual(request['messages'][1]['content'], raw)
            self.assertEqual(json.loads((Path(tmp)/'llm-response.json').read_text()), response)

    def test_sampling_cannot_override_request_structure(self):
        for settings in ({'model':'different'}, {'messages':[]}, {'temperature':float('nan')}, {'top_k':1.5}):
            with self.assertRaises(ValueError): sampling_settings(settings)
        self.assertEqual(sampling_settings({'temperature':0})['temperature'], 0)

    def test_backend_format_error_is_recorded(self):
        error = HTTPError('http://local', 500, 'format', {}, io.BytesIO(b'{"error":"template format"}'))
        with tempfile.TemporaryDirectory() as tmp, patch('engine.local_json', side_effect=[{'prompt':'p'}, {'tokens':[1]}, error]):
            with self.assertRaisesRegex(ValueError, 'HTTP 500'):
                translate({'lines':[{'id':'a','raw':'原文'}], 'run_dir':tmp}, {'llm_url':'http://local','llm_model':'test','prompt_revision':REVISION})
            record = json.loads((Path(tmp)/'llm-error.json').read_text())
            self.assertEqual(record['status'], 500)
            self.assertIn('template format', record['body'])

    def test_user_instruction_survives_model_template(self):
        raw = '月いとあかし。'
        content = TEXT_PROMPT+'\n\n【古文】\n'+raw+'\n\n【現代語訳】'
        response = {'choices':[{'finish_reason':'stop','message':{'content':'月がとても明るい。'}}]}
        with tempfile.TemporaryDirectory() as tmp, patch('engine.local_json', side_effect=[{'prompt':'<s>'+content}, {'tokens':[1]}, response]) as call:
            result = translate({'lines':[{'id':'a','raw':raw}], 'run_dir':tmp}, {'llm_url':'http://local','llm_model':'test','prompt_revision':TEXT_REVISION})
            request = json.loads((Path(tmp)/'llm-request.json').read_text())
            self.assertEqual(request['messages'], [{'role':'user','content':content}])
            self.assertTrue(result['metrics']['prompt_contains_instructions'])
            self.assertEqual((Path(tmp)/'llm-prompt.txt').read_text(), '<s>'+content)

    def test_dropped_instruction_is_not_sent_for_generation(self):
        with patch('engine.local_json', return_value={'prompt':'本文のみ'}) as call:
            with self.assertRaisesRegex(ValueError, '翻訳指示または本文'):
                translate({'lines':[{'id':'a','raw':'本文のみ'}]}, {'llm_url':'http://local','llm_model':'test','prompt_revision':TEXT_REVISION})
            self.assertEqual(call.call_count, 1)

    def test_foreign_word_and_fragment_are_review_flags(self):
        text, warnings, _ = check_text('雨 even 降るのも趣がある。', '雨などのふるさへおかし')
        self.assertIn('even', text)
        self.assertTrue(any('英字' in w for w in warnings))
        self.assertTrue(any('途中切れ' in w for w in warnings))


if __name__ == '__main__': unittest.main()
