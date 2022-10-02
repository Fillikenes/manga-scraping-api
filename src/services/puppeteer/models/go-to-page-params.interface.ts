import { Browser } from 'puppeteer';

export interface IGoToPageParams {
  browser: Browser;
  url: string;
  setRandomUA?: boolean;
}
