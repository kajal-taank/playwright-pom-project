import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,

  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://www.facebook.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  }
});
