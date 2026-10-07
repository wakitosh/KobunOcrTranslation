import { defineConfig } from '@playwright/test';
import config from './playwright.config';
export default defineConfig({ ...config, testMatch: 'reading-window.spec.ts', timeout: 45000 });
