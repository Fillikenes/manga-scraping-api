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
      getSpy = jest.spyOn(got, 'get');
    });

    it('should send a http get query without headers and query arguments (not json)', async () => {
      getSpy.mockResolvedValue(expected);

      const result = await service.get({
        url: params.url,
      });

      expect(result).toBeDefined();
      expect(result).toEqual(expected);
      expect(getSpy).toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalledWith(params.url, {});
    });

    it('should send a http get query with headers and query arguments (not json)', async () => {
      getSpy.mockResolvedValue(expected);

      const result = await service.get({
        url: params.url,
        headers: params.headers,
        query: params.query,
        isJson: false,
      });

      expect(result).toBeDefined();
      expect(result).toEqual(expected);
      expect(getSpy).toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalledWith(params.url, {
        headers: params.headers,
        searchParams: params.query,
      });
    });

    it('should send a http get query but its require a json response', async () => {
      const jsonSpy = jest.fn().mockResolvedValue(expected);
      getSpy.mockReturnValue({
        json: jsonSpy,
      });

      const result = await service.get({
        url: params.url,
        isJson: true,
      });

      expect(result).toBeDefined();
      expect(result).toEqual(expected);
      expect(getSpy).toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalledWith(params.url, {});
      expect(jsonSpy).toHaveBeenCalled();
    });
  });
});
