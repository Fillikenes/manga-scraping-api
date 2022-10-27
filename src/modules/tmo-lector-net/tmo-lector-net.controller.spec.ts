import { Test, TestingModule } from '@nestjs/testing';
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
});
