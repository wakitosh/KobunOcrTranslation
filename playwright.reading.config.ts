import { defineConfig } from '@playwright/test';
import config from './playwright.config';
export default defineConfig({ ...config, testMatch: ['reading-window.spec.ts', 'reading-layout.spec.ts', 'viewer-compatibility.spec.ts'], timeout: 45000 });
