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
});
