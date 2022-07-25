import { Test, TestingModule } from '@nestjs/testing';
import { LectorTmoController } from './lector-tmo.controller';
import { LectorTmoService } from './lector-tmo.service';

describe('LectorTmoController', () => {
  let controller: LectorTmoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectorTmoController],
      providers: [
        {
          provide: LectorTmoService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LectorTmoController>(LectorTmoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
