import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // use Facebook-specific selectors and fallback options
  usernameInput = () =>
    this.page.locator('input#email, input[name="email"], input[type="email"]');

  passwordInput = () =>
    this.page.locator('input#pass, input[name="pass"], input[type="password"]');

  loginButton = () => this.page.locator('button[name="login"], button:has-text("Log In")');

  // Accept optional url, default to facebook home/login
  async goto(url?: string) {
    const target = url ?? 'https://www.facebook.com/';
    await this.page.goto(target, { waitUntil: 'load' });

    // wait for any of the common login inputs to appear
    await this.page.waitForSelector(
      'input#email, input[name="email"], input#pass, input[name="pass"], input[type="email"], input[type="password"]',
      { timeout: 15000 }
    );
  }

  async login(username: string, password: string) {
    // explicit visibility waits with higher timeouts
    await expect(this.usernameInput()).toBeVisible({ timeout: 15000 });
    await expect(this.passwordInput()).toBeVisible({ timeout: 15000 });

    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);

    // click and wait for navigation (if login triggers navigation)
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {}),
      this.loginButton().click(),
    ]);
  }

  // async assertLoggedIn() {
  //  await expect(this.dashboardHeader()).toHaveText('Dashboard');
  // }
}
