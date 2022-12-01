import { Test, TestingModule } from '@nestjs/testing';
import { MangaTigreController } from './manga-tigre.controller';
import { MangaTigreService } from './manga-tigre.service';

describe('MangaTigreController', () => {
  let controller: MangaTigreController;
  let service: MangaTigreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MangaTigreController],
      providers: [
        {
          provide: MangaTigreService,
          useValue: {
            getManga: jest.fn(),
            searchManga: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MangaTigreController>(MangaTigreController);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    service = module.get<MangaTigreService>(MangaTigreService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('#getManga - should get the data of a manga of manga tigre site based in manga name given as argument', async () => {
    const params = {
      manga: 'one punch man',
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
      .spyOn(service, 'getManga')
      .mockResolvedValue(expectedResponse);

    const result = await controller.getManga(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResponse);
    expect(getImagesChapterSpy).toHaveBeenCalledWith(params.manga);
  });

  it('#searchManga - should get list of a mangas from manga tigre site based in manga name given as argument', async () => {
    const params = {
      manga: 'one p',
    };
    const expectedResponse = {
      chapters: [
        {
          id: 1,
          name: 'one punch man',
          slug: 'one-punch-man',
        },
        {
          id: 2,
          name: 'one piece',
          slug: 'one-piece',
        },
      ],
    };
    const getImagesChapterSpy = jest
      .spyOn(service, 'searchManga')
      .mockResolvedValue(expectedResponse);

    const result = await controller.searchManga(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedResponse);
    expect(getImagesChapterSpy).toHaveBeenCalledWith(params.manga);
  });
});
