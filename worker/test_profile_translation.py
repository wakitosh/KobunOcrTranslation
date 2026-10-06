import unittest
from profile_translation import validate_cases, summarize


class ProfileTests(unittest.TestCase):
    def test_cases_reject_ambiguous_or_empty_measurements(self):
        for cases in ([], {}, [{'id': 'a', 'text': ''}], [{'id': 'a', 'text': '文'}]*2):
            with self.assertRaises(ValueError): validate_cases(cases)
        validate_cases([{'id': 'a', 'text': '文'}])

    def test_failures_are_not_successful_latency_samples(self):
        trials = [{'elapsed_seconds': 4, 'llm_process': {'rss_peak_sampled_bytes': 100}},
            {'elapsed_seconds': 200, 'error': 'timeout', 'llm_process': {'rss_peak_sampled_bytes': 200}}]
        result = summarize(trials)
        self.assertEqual(result['successes'], 1)
        self.assertEqual(result['median_seconds'], 4)
        self.assertEqual(result['rss_peak_sampled_bytes'], 200)
        self.assertIsNone(result['p95_seconds'])


if __name__ == '__main__': unittest.main()
