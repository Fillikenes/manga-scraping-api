import { Test, TestingModule } from '@nestjs/testing';
import { LectorTmoController } from './lector-tmo.controller';
import { LectorTmoService } from './lector-tmo.service';

describe('LectorTmoController', () => {
  let controller: LectorTmoController;
  let service: LectorTmoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectorTmoController],
      providers: [
        {
          provide: LectorTmoService,
          useValue: {
            getImagesChapter: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LectorTmoController>(LectorTmoController);
    service = module.get<LectorTmoService>(LectorTmoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('#getData - should get the data of a manga of lector tmo site based in the url given as argument', async () => {
    const params = {
      url: 'https://lectormanga.com/library/manga/9276/one-punch-man',
    };
    const expectedResponse = {
      chapters: [
        {
          id: 1,
          name: 'one punch',
          images: [],
        },
      ],
    };
    const getImagesChapterSpy = jest
      .spyOn(service, 'getImagesChapter')
      .mockResolvedValue(expectedResponse);

    const result = await controller.getData(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResponse);
    expect(getImagesChapterSpy).toHaveBeenCalledWith(params.url);
  });
});
