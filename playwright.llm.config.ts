import { defineConfig } from '@playwright/test';
import config from './playwright.config';
export default defineConfig({ ...config, testMatch: 'llm.spec.ts', timeout: 45000 });
