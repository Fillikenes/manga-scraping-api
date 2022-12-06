import { Test, TestingModule } from '@nestjs/testing';
import { MangaTigreService } from './manga-tigre.service';
import { HttpService } from '../../services/http/http.service';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';

jest.mock('puppeteer', () => ({
  Page: jest.fn().mockImplementation(() => ({
    $$eval: jest.fn(),
    url: jest.fn().mockReturnValue(''),
  })),
  Browser: jest.fn(),
}));

describe('MangaTigreService', () => {
  let service: MangaTigreService;
  let httpService: HttpService;
  let puppeteerService: PuppeteerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MangaTigreService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
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

    service = module.get<MangaTigreService>(MangaTigreService);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    httpService = module.get<HttpService>(HttpService);
    puppeteerService = module.get<PuppeteerService>(PuppeteerService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
