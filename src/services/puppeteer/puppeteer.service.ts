import { Injectable } from '@nestjs/common';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import Adblocker from 'puppeteer-extra-plugin-adblocker';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import randomUseragent from 'random-useragent';
import { UA } from './constants';
import { EDomContentLoaded, ENetworkProtocols } from './enums';
import { IGoToPageParams } from './models';

@Injectable()
export class PuppeteerService {
  async createBrowser(): Promise<Browser> {
    puppeteer.use(StealthPlugin());
    puppeteer.use(Adblocker({ blockTrackers: true }));
    return puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080',
      ],
    });
  }

  async goToPage({
    browser,
    url,
    setRandomUA,
  }: IGoToPageParams): Promise<Page> {
    const page = await browser.newPage();

    if (setRandomUA) {
      const userAgent = randomUseragent.getRandom();
      await page.setUserAgent(userAgent);
    } else {
      await page.setUserAgent(UA);
    }

    await page.goto(url, { waitUntil: EDomContentLoaded.Domcontentloaded });
    return page;
  }

  async closeBrowser(browser: Browser): Promise<void> {
    await browser.close();
  }

  async clearCookies(page: Page): Promise<void> {
    const client = await page.target().createCDPSession();
    await client.send(ENetworkProtocols.Cookies);
    await client.send(ENetworkProtocols.Cache);
  }

  async closePage(page: Page): Promise<void> {
    await page.close();
  }
}
