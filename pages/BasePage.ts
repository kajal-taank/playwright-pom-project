import { Page, Locator } from '@playwright/test';
export class BasePage{
    readonly page: page;

    constructor(page:page){
        this.page = page;}

        async goto(url:string){
            await this.page.goto (url,{waitUntil:'load'});
        }
        async getTitle(){
            return this.page.title();
        }




}