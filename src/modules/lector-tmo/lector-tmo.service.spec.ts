import { Test, TestingModule } from '@nestjs/testing';
import { LectorTmoService } from './lector-tmo.service';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';
import { Browser, Page } from 'puppeteer';
import * as utils from '../../shared/utils';
import { IChapterContainer } from './models';

jest.mock('puppeteer', () => ({
  Page: jest.fn().mockImplementation(() => ({
    $$eval: jest.fn(),
    url: jest.fn().mockReturnValue(''),
  })),
  Browser: jest.fn(),
}));

describe('LectorTmoService', () => {
  let service: LectorTmoService;
  let puppeteerService: PuppeteerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectorTmoService,
        {
          provide: PuppeteerService,
          useValue: {
            createBrowser: jest.fn(),
            goToPage: jest.fn(),
            clearCookies: jest.fn(),
            closeBrowser: jest.fn(),
            closePage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LectorTmoService>(LectorTmoService);
    puppeteerService = module.get<PuppeteerService>(PuppeteerService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getImagesChapter', () => {
    const urlParam = 'https://lectormanga.com/library/manga/9276/one-punch-man';
    const browser = new Browser();
    const page = new Page();
    const spiesFn = {
      createBrowser: {},
      goToPage: {},
      clearCookies: {},
      closeBrowser: {},
      sleep: {},
    };

    beforeEach(() => {
      spiesFn.createBrowser = jest
        .spyOn(puppeteerService, 'createBrowser')
        .mockResolvedValue(browser);
      spiesFn.goToPage = jest
        .spyOn(puppeteerService, 'goToPage')
        .mockResolvedValue(page);
      spiesFn.clearCookies = jest
        .spyOn(puppeteerService, 'clearCookies')
        .mockResolvedValue();
      spiesFn.closeBrowser = jest
        .spyOn(puppeteerService, 'closeBrowser')
        .mockResolvedValue();
      spiesFn.sleep = jest.spyOn(utils, 'sleep').mockResolvedValue({});
    });

    it('should get the data information of a manga from lector tmo with no chapters found', async () => {
      jest.spyOn(page, '$$eval').mockImplementation((_selector, cb: any) => {
        return cb([]);
      });

      const result = await service.getImagesChapter(urlParam);

      expect(result).toBeDefined();
      expect(result).toEqual([]);
    });

    it('should get data information of a manga from lector tmo with valid chapters founded', async () => {
      const expectedResponse: IChapterContainer[] = [...Array(10).keys()].map(
        (indexChapter) => ({
          name: `Chapter ${indexChapter}`,
          url: `https://lectormanga.com/view_uploads/${indexChapter}`,
          images: [...Array(2 + indexChapter).keys()].map((i) => `${i}.jpg`),
        }),
      );
      const expectedChaptersElements = expectedResponse.map(
        (chapterResponse: IChapterContainer) => {
          return {
            querySelector: jest.fn().mockReturnValue({
              innerText: chapterResponse.name,
              getAttribute: jest.fn().mockReturnValue(chapterResponse.url),
            }),
          };
        },
      );
      jest.spyOn(page, '$$eval').mockImplementationOnce((selector, cb: any) => {
        expect(selector).toEqual('li.list-group-item.upload-link');
        return cb(expectedChaptersElements);
      });
      let indexCurrentImagesChapter = 0;
      jest.spyOn(page, '$$eval').mockImplementation((selector, cb: any) => {
        expect(selector).toEqual('img.viewer-img');
        const expectedImagesElements = expectedResponse[
          indexCurrentImagesChapter++
        ].images.map((image) => {
          return {
            getAttribute: jest.fn().mockReturnValue(image),
          };
        });
        return cb(expectedImagesElements);
      });

      const result = await service.getImagesChapter(urlParam);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
    });
  });
});
