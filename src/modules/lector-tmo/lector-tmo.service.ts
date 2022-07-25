import { Injectable } from '@nestjs/common';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';

@Injectable()
export class LectorTmoService {
  constructor(private readonly puppeteerService: PuppeteerService) {}
  async foo(
    url = 'https://lectortmo.com/library/manga/9276/one-punch-man',
  ): Promise<string> {
    const browser = await this.puppeteerService.createBrowser();
    const page = await this.puppeteerService.goToPage({
      browser,
      url,
      setRandomUA: true,
    });

    const mangaUrl = await page.$eval('ul.chapter-list', (container) => {
      const aTag = container
        ?.querySelector('li')
        ?.querySelector('div')
        ?.querySelector('div:last-child')
        ?.querySelector('a');
      return aTag?.getAttribute('href');
    });

    await this.puppeteerService.clearCookies(page);
    const page2 = await this.puppeteerService.goToPage({
      browser,
      url: mangaUrl,
    });

    await this.puppeteerService.closeBrowser(browser);
    return mangaUrl;
  }
}
