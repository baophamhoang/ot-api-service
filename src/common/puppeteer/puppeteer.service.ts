// import puppeteer from 'puppeteer-core';
// import chrome from 'chrome-aws-lambda';
// import { ConfigService } from '@/configs';
// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import { ScrapeRestaurantResponse } from './interface';

// @Injectable()
// export class PuppeteerService implements OnModuleInit {
//   private options: Parameters<typeof puppeteer.launch>['0'];
//   private logger = new Logger(PuppeteerService.name);

//   constructor(private readonly config: ConfigService) {}
//   async onModuleInit() {
//     this.options = await getOptions(this.config);
//   }

//   public async scrapeRestaurant(url: string): Promise<ScrapeRestaurantResponse | null> {
//     const browser = await puppeteer.launch(this.options);
//     const page = await browser.newPage();
//     page.setUserAgent(
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
//     );
//     await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });

//     const text = await page.$eval('script#__NEXT_DATA__[type="application/json"]', (el) => el.textContent);
//     if (!text) {
//       await browser.close();
//       return null;
//     }

//     await browser.close();

//     const data = JSON.parse(text);
//     const restaurants = data.props.initialReduxState.pageRestaurantDetail;
//     return { data: restaurants, json: JSON.stringify(restaurants) };
//   }
// }

// const getOptions = async (config: ConfigService): Promise<Parameters<typeof puppeteer.launch>['0']> => {
//   const exePath =
//     process.platform === 'win32'
//       ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
//       : process.platform === 'linux'
//       ? '/usr/bin/google-chrome'
//       : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
//   const options =
//     config.nodeEnv === 'local'
//       ? { args: [], executablePath: exePath }
//       : {
//           args: chrome.args,
//           executablePath: await chrome.executablePath,
//         };

//   return { ...options, headless: true };
// };
