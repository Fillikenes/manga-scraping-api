import { Test, TestingModule } from '@nestjs/testing';

const JSDOMMock = jest.fn().mockImplementation(() => ({
  window: {
    document: {},
  },
}));

const jsdomMock = {
  JSDOM: JSDOMMock,
};

jest.mock('jsdom', () => jsdomMock);

import { HtmlParserService } from './html-parser.service';

describe('HtmlParserService', () => {
  let service: HtmlParserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmlParserService],
    }).compile();

    service = module.get<HtmlParserService>(HtmlParserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#parseHtml', () => {
    it('should parse a string content to a valid document html', async () => {
      const params = '';

      const result = await service.parseHtml(params);

      expect(result).toBeDefined();
      expect(jsdomMock.JSDOM).toHaveBeenCalled();
      expect(jsdomMock.JSDOM).toHaveBeenCalledWith(params);
    });
  });
});
