import puppeteer from 'puppeteer';
import { ConfigService } from '@/configs';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ScrapeRestaurantResponse } from './interface';
import os from 'os';
import fs from 'fs';

@Injectable()
export class PuppeteerService implements OnModuleInit {
  private options: Parameters<typeof puppeteer.launch>['0'];
  private logger = new Logger(PuppeteerService.name);

  constructor(private readonly config: ConfigService) {}
  async onModuleInit() {
    this.options = await getOptions(this.config);
  }

  public async scrapeRestaurant(url: string): Promise<ScrapeRestaurantResponse | null> {
    const browser = await puppeteer.launch(this.options);
    const page = await browser.newPage();
    page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
    );
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });

    const text = await page.$eval('script#__NEXT_DATA__[type="application/json"]', (el) => el.textContent);
    if (!text) {
      await browser.close();
      return null;
    }

    await browser.close();

    const data = JSON.parse(text);
    const restaurants = data.props.initialReduxState.pageRestaurantDetail;
    return { data: restaurants, json: JSON.stringify(restaurants) };
  }
}

const getOptions = async (config: ConfigService): Promise<Parameters<typeof puppeteer.launch>['0']> => {
  // Get the home directory
  const homeDirectory = os.homedir();

  const exePath =
    process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : process.platform === 'linux'
      ? '/usr/bin/chromium-browser'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  const options = {
    args: [],
    executablePath: exePath,
  };

  fs.readdir(homeDirectory, (err, files) => {
    if (err) {
      console.error('Error reading cache directory:', err);
    } else {
      files.forEach((file) => {
        console.log(file);
      });
    }
  });

  fs.readdir(`${homeDirectory}/project`, (err, files) => {
    if (err) {
      console.error('Error reading project directory:', err);
    } else {
      console.log('-> start reading project: ');
      files.forEach((file) => {
        console.log('+ ', file);
      });
      console.log('-> end reading:');
    }
  });

  fs.readdir(`${homeDirectory}/project/src`, (err, files) => {
    if (err) {
      console.error('Error reading src directory:', err);
    } else {
      console.log('-> stazc:  ');
      files.forEach((file) => {
        console.log('+ ', file);
      });
      console.log('-> end reading: ');
    }
  });

  fs.readdir(`${homeDirectory}/.cache`, (err, files) => {
    if (err) {
      console.error('Error reading src directory:', err);
    } else {
      console.log('-> start reading cache:  ');
      files.forEach((file) => {
        console.log('+ ', file);
      });
      console.log('-> end reading: ');
    }
  });

  fs.readdir(`${homeDirectory}/.cache/puppeteer`, (err, files) => {
    if (err) {
      console.error('Error reading src/puppeteer directory:', err);
    } else {
      console.log('-> start reading cache:  ');
      files.forEach((file) => {
        console.log('+ ', file);
      });
      console.log('-> end reading: ');
    }
  });

  // readDir(homeDirectory);

  return { ...options, headless: true };

  return {
    // ...options,
    headless: false,
    args: ['--no-sandbox'],
  };
};

const readDir = (directory: string) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading cache directory:', err);
    } else {
      console.log('-> start reading: ', directory);
      files.forEach((file) => {
        console.log('+ ', file);
        readDir(file);
      });
      console.log('-> end reading: ', directory);
    }
  });
};
