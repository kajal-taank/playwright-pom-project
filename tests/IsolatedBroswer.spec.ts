
import {test,expect} from '@playwright/test'
 test.describe('Isolated Browser Context Tests',() =>{

    test('test in isolated browser context', async({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://chatgpt.com');
        expect(await page.title()).toBe('ChatGPT');
        await context.close(); 
    }
    
    );
   
 });

 test.only('multiple tabs handling in same browser context', async({browser})=>{
  test.setTimeout(120000);
    const context = await browser.newContext();
    const page1 = await context.newPage();
   await page1.goto('https://www.amazon.in');
await page1.waitForLoadState('networkidle', { timeout: 120000 });
expect(await page1.title()).toContain('Amazon.in');

   // expect (await page1.title()).toContain('Amazon.in');
      const page2 = await context.newPage();
      await page2.goto('https://www.flipkart.com');
        await page2.waitForLoadState('load');
      
      //await context.close();
    })

 test('incognito broswer context test ', async ({browser})=>
{
    const incognito = await browser.newContext();
    const page = await incognito.newPage();
await page.goto('https://www.wikipedia.org');
await page.waitForLoadState('load');
expect.soft(await page.title()).toBe('Wikipedia');
await incognito.close();
});








