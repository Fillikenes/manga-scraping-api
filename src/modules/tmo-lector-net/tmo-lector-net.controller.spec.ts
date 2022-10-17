import { Test, TestingModule } from '@nestjs/testing';
import { TmoLectorNetController } from './tmo-lector-net.controller';
import { TmoLectorNetService } from './tmo-lector-net.service';

describe('TmoLectorNetController', () => {
  let controller: TmoLectorNetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TmoLectorNetController],
      providers: [
        {
          provide: TmoLectorNetService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TmoLectorNetController>(TmoLectorNetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
