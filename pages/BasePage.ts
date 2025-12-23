import { Page, Locator } from '@playwright/test';
export class BasePage{
     protected readonly page: Page;

    constructor(page:Page){
        this.page = page;}

        async goto(url:string){
            await this.page.goto (url,{waitUntil:'load'});
        }
        async getTitle(){
            return this.page.title();
        }




}