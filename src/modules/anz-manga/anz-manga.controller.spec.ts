import { Test, TestingModule } from '@nestjs/testing';
import { AnzMangaController } from './anz-manga.controller';
import { AnzMangaService } from './anz-manga.service';
import { AnzMangaQueryDto, AnzMangaSearchDto } from './dtos';

describe('AnzMangaController', () => {
  let controller: AnzMangaController;
  let service: AnzMangaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnzMangaController],
      providers: [
        {
          provide: AnzMangaService,
          useValue: {
            get: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AnzMangaController>(AnzMangaController);
    service = module.get<AnzMangaService>(AnzMangaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('#get - should get the information of a manga based in the url', async () => {
    const params: AnzMangaQueryDto = {
      url: 'www.page.com',
    };
    const expectedResponse = [
      {
        id: 1,
        name: 'manga',
        url: '-',
        images: [],
      },
    ];
    const getPageSpy = jest
      .spyOn(service, 'get')
      .mockResolvedValue(expectedResponse);

    const result = await controller.get(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResponse);
    expect(getPageSpy).toHaveBeenCalledWith(params);
  });

  it('#search - should get suggestions of mangas based in the search value given as argument', async () => {
    const params: AnzMangaSearchDto = {
      value: 'One piece',
    };
    const expectedResponse = [
      {
        name: 'one piece',
        url: 'www.onepiece.com',
      },
    ];
    const searchSpy = jest
      .spyOn(service, 'search')
      .mockResolvedValue(expectedResponse);

    const result = await controller.search(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResponse);
    expect(searchSpy).toHaveBeenCalledWith(params);
  });
});
