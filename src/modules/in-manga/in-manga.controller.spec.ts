import { Test, TestingModule } from '@nestjs/testing';
import { InMangaController } from './in-manga.controller';
import { InMangaService } from './in-manga.service';
import { InMangaGetDto, InMangaSearchDto } from './dtos';
import { OSearchResponse, mangaResponse } from './mocks';

describe('InMangaController', () => {
  let controller: InMangaController;
  let service: InMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InMangaController],
      providers: [
        {
          provide: InMangaService,
          useValue: {
            get: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InMangaController>(InMangaController);
    service = module.get<InMangaService>(InMangaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#get', () => {
    it('should get the information of a manga based in the manga name', async () => {
      const params: InMangaGetDto = {
        url: 'One Piece',
      };
      const getMangaSpy = jest
        .spyOn(service, 'get')
        .mockResolvedValue(mangaResponse);

      const result = await controller.get(params);

      expect(result).toBeDefined();
      expect(result).toEqual(mangaResponse);
      expect(getMangaSpy).toHaveBeenCalledWith(params);
    });
  });

  describe('#search', () => {
    it('should get the information of a manga based in the manga name', async () => {
      const params: InMangaSearchDto = {
        value: 'One Piece',
      };
      const searchMangaSpy = jest
        .spyOn(service, 'search')
        .mockResolvedValue(OSearchResponse);

      const result = await controller.search(params);

      expect(result).toBeDefined();
      expect(result).toEqual(OSearchResponse);
      expect(searchMangaSpy).toHaveBeenCalledWith(params);
    });
  });
});
