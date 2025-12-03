import dotenv from 'dotenv';
import path from 'path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

test.describe('Login flow', () => {
  test('should log in with valid credentials', async ({ page }) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    
    console.log('Using username:', username);
    console.log('Using password:', password);

    if (!username || !password) {
      throw new Error(' USERNAM or PASSWORD are not set');
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto("https://www.facebook.com/");

    await loginPage.login(username, password);

    await page.waitForLoadState('networkidle');
  });
});
