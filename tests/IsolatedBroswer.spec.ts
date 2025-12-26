import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('Multiple tabs handling in same browser context', () => {
  let context: BrowserContext;
  let page1: Page;
  let page2: Page;

  test.beforeAll(async ({ browser }) => {
    // Create a new browser context
    context = await browser.newContext();
  });

  test('Open multiple tabs and verify titles', async () => {
    // Open first tab
    page1 = await context.newPage();
    await page1.goto('https://www.amazon.in', { waitUntil: 'domcontentloaded', timeout: 180000 });
    await expect(page1).toHaveTitle(/Amazon\.in/i);

    // Open second tab
    page2 = await context.newPage();
    await page2.goto('https://www.flipkart.com', { waitUntil: 'domcontentloaded', timeout: 180000 });
    await expect(page2).toHaveTitle(/Flipkart/i);

    // Switch back to first tab and interact if needed
    await page1.bringToFront();
    // Example: check search box exists
    const searchBox = await page1.$('input[id="twotabsearchtextbox"]');
    expect(searchBox).not.toBeNull();

    // Switch to second tab
    await page2.bringToFront();
    const flipkartSearch = await page2.$('input[name="q"]');
    expect(flipkartSearch).not.toBeNull();
  });

  test.afterAll(async () => {
    await context.close(); // Close context and all tabs
  });
});
