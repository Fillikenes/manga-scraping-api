import { Test, TestingModule } from '@nestjs/testing';
import got from 'got';
import { HttpService } from './http.service';

jest.mock('got');

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService],
    }).compile();

    service = module.get<HttpService>(HttpService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#get', () => {
    const params = {
      url: 'www.nacho-culiao.com',
      headers: { token: 'EL-NACHO-SE-LA-COME' },
      query: { user: 'NACHO' },
    };
    const expected = { body: '<h1>NACHO CHUPALO</h1>' };
    let getSpy: jest.SpyInstance;

    beforeEach(() => {
      getSpy = jest.spyOn(got, 'get').mockResolvedValue(expected);
    });

    it('should send a http get query without headers and query arguments', async () => {
      const result = await service.get(params.url);

      expect(result).toBeDefined();
      expect(result).toEqual(expected);
      expect(getSpy).toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalledWith(params.url, {});
    });

    it('should send a http get query with headers and query arguments', async () => {
      const result = await service.get(
        params.url,
        params.headers,
        params.query,
      );

      expect(result).toBeDefined();
      expect(result).toEqual(expected);
      expect(getSpy).toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalledWith(params.url, {
        headers: params.headers,
        searchParams: { query: params.query },
      });
    });
  });
});
