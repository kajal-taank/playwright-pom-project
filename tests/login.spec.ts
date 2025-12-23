import dotenv from 'dotenv';
import path from 'path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../Types/Credentials';

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

test.describe('Login flow', () => {
  test('should log in with valid credentials', async ({ page }) => {

    const creds: credentials={

  
     username : process.env.USERNAME ??'',
     password : process.env.PASSWORD ??''
    };
   

    if (!creds.username || !creds.password) {
      throw new Error(' USERNAM or PASSWORD are not set');
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto("https://www.facebook.com/");
    await loginPage.open();
    await loginPage.login(creds);

    await page.waitForLoadState('networkidle');
  });
});
