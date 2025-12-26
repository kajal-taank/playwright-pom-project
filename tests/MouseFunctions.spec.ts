import { test, expect, Page } from '@playwright/test';

test.describe('mouse click functions', () => {

  test('mouse double click function', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/', {
      timeout: 60000,
      waitUntil: 'domcontentloaded'
    });
    await page.locator("#name").fill("Playwright");
    await page.locator('#email').fill("playwright@example.com");
    await page.locator('#phone').fill("1234567890");
    await page.locator('#textarea').fill("123 Playwright St, Test City");
    await page.getByLabel('Female').check();
    await page.getByLabel('Sunday').click();
    await page.locator("#country").selectOption('India');
    await page.locator("#colors").selectOption(['Red', 'Blue']);
    await page.locator("#animals").selectOption(['lion', 'Rabbit']);

    // ------- DATE PICKER START -----------

    const year = "1997";
    const month = "June";
    const date = 15;

    await page.click('#datepicker');

    while (true) {
      const currentYear = await page.locator('.ui-datepicker-year').textContent();
      const currentMonth = await page.locator('.ui-datepicker-month').textContent();

      if (currentYear?.trim() === year && currentMonth?.trim() === month) {
        break;
      }

      // NEXT SHOULD BE INSIDE LOOP  ✔ FIXED
     await page.locator('[title="Prev"]').click();
    }

    // ✔ FIXED WRONG SELECTOR
    await page.click(`.ui-datepicker-calendar td a:text-is("${date}")`);

    await page.waitForTimeout(2000);


    /*const year2 = "2020";
    const month2 = "February";
    const date2 = 10;

    await page.click('#txtDate');   // ⬅ your second datepicker selector

    while (true) {
      const currentYear2 = await page.getByRole('combobox', { name: 'Select year' }).textContent();
      const currentMonth2 = await page.locator('.ui-datepicker-month').textContent();
    
      if (currentYear2 === year2 && currentMonth2 === month2) 
      {
        break;
      }
      await page.locator('.ui-datepicker-prev').click();
    }

    await page.click(`.ui-datepicker-calendar td a:text-is("${date2}")`);
    await page.waitForTimeout(1000);*/

        await page.click('#txtDate');   // ⬅ your second datepicker select
        await page.selectOption('select.ui-datepicker-year', '2020');
        await page.selectOption('select.ui-datepicker-month', '1');
        await page.click(`.ui-datepicker-calendar td a:text-is("10")`);
        await page.waitForTimeout(2000);

    // ------- DATE PICKER range  -----------


   
   const startrange = await page.locator('#start-date')
    const endrange = await page.locator('#end-date')
    await startrange.click();
    await endrange.click();
     await startrange.fill('2022-10-10');
      await endrange.fill('2022-10-10');






  });
});

