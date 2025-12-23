import { Page, expect, Locator } from '@playwright/test';

import { BasePage } from './BasePage';
import { credentials }  from '../Types/Credentials';  
import { promises } from 'dns';



export class LoginPage extends BasePage {
  

  constructor(page: Page) {
     super(page);
  }

  // All selectors stored in one place
  private selectors = {
    username: 'input#email, input[name="email"], input[type="email"]',
    password: 'input#pass, input[name="pass"], input[type="password"]',
    loginBtn: 'button[name="login"], button:has-text("Log In")',
  };

  // Locator getters
  private usernameInput(): Locator {
    return this.page.locator(this.selectors.username);
  }

  private passwordInput(): Locator {
    return this.page.locator(this.selectors.password);
  }

  private loginButton(): Locator {
    return this.page.locator(this.selectors.loginBtn);
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.facebook.com/');
    await this.page.waitForSelector(this.selectors.username, { timeout: 15000 });
  }

  async login (creds  : credentials) : Promise<void> {
    const {username, password} =creds;
    await expect(this.usernameInput()).toBeVisible({ timeout: 15000 });
    await expect(this.passwordInput()).toBeVisible({ timeout: 15000 });

    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
      this.loginButton().click()
    ]);
  }
}