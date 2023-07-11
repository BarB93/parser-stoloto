import puppeteer from 'puppeteer';
import {sleep} from "./helpers/common.js";

const launchPuppeteerOpts = {
    args: [
        '--window-size=1920,1080',
    ],
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: {
        width:1920,
        height:1080
    }
}

const pageOpts = {
    networkIdle2Timeout: 3000,
    waitUntil: 'domcontentloaded',
    timeout: 60000,
    }

;(async () => {
   while (true) {
       const browser = await puppeteer.launch(launchPuppeteerOpts);
       const page = await browser.newPage();


       await page.goto('https://www.stoloto.ru/ruslotto/game/?from=bingo', pageOpts);
       const refreshButton = await page.waitForSelector('#refreshTicketsBig')

       while (true) {
           await refreshButton.click()
           const finalResponse = await page.waitForResponse(
               (response) =>
                   response.url().includes('change?') && response.status() === 200,
           )
           const data = await finalResponse.json()

           console.log('data', data)

           await sleep(5000)
       }

   }
})()