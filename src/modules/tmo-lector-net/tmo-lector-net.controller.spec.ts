import { Test, TestingModule } from '@nestjs/testing';
import { TmoLectorNetParamDto, TmoLectorNetSearchParamDto } from './dto';
import { TmoLectorNetController } from './tmo-lector-net.controller';
import { TmoLectorNetService } from './tmo-lector-net.service';

describe('TmoLectorNetController', () => {
  let controller: TmoLectorNetController;
  let service: TmoLectorNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TmoLectorNetController],
      providers: [
        {
          provide: TmoLectorNetService,
          useValue: {
            getPage: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TmoLectorNetController>(TmoLectorNetController);
    service = module.get<TmoLectorNetService>(TmoLectorNetService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getManga', () => {
    it('should get the information of a manga of lector tmo net based in the url given as argument', async () => {
      const params = {
        url: 'https://tmolector.net/manga/one-punch-man',
      } as TmoLectorNetParamDto;
      const expectedResponse = [
        {
          id: 213,
          url: 'https://tmolector.net/capitulo/one-punch-man-213.00',
          name: 'Capítulo 213.00',
          images: [
            {
              url: 'https://i.pixl.is/023b627cd4840939c1.jpg',
              correlative: 1,
            },
            {
              url: 'https://i.pixl.is/03c720467ec153d152.jpg',
              correlative: 2,
            },
          ],
        },
      ];
      const getPageSpy = jest
        .spyOn(service, 'getPage')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getManga(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(getPageSpy).toBeCalled();
      expect(getPageSpy).toBeCalledWith(params.url);
    });
  });

  describe('#searchManga', () => {
    it('should return a list of mangas in the site based in the arguments given', async () => {
      const paramsBody = {
        value: 'dragon',
      } as TmoLectorNetSearchParamDto;
      const paramsQuery = { getAll: true };
      const expectedResponse = [
        {
          url: 'https://tmolector.net/manga/shonen-no-abyss-senkou-shojo',
          name: 'Shonen no Abyss - Senkou Shojo',
          thumbnail: 'https://img1.tmolector.net/cover/6343c12ae7dde.jpg',
        },
        {
          url: 'https://tmolector.net/manga/el-dormitorio-secreto-de-la-princesa-abandonada',
          name: 'El Dormitorio Secreto De La Princesa Abandonada',
          thumbnail: 'https://img1.tmolector.net/cover/6339fafc24216.jpg',
        },
      ];
      const searchSpy = jest
        .spyOn(service, 'search')
        .mockResolvedValue(expectedResponse);

      const result = await controller.searchManga(
        paramsBody,
        paramsQuery.getAll,
      );

      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
      expect(searchSpy).toHaveBeenCalled();
      expect(searchSpy).toHaveBeenCalledWith(
        paramsBody.value,
        paramsQuery.getAll,
      );
    });
  });
});
