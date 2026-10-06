import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', workers: 1, timeout: 360_000,
  outputDir: 'var/test-results/browser',
  use: { channel: 'chrome', headless: true, ignoreHTTPSErrors: true,
    baseURL: 'https://omeka-s.ddev.site', viewport: { width: 1600, height: 1100 },
    screenshot: 'only-on-failure', trace: 'off' },
});
