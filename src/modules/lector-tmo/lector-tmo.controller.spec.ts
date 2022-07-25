import { Test, TestingModule } from '@nestjs/testing';
import { LectorTmoController } from './lector-tmo.controller';

describe('LectorTmoController', () => {
  let controller: LectorTmoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectorTmoController],
    }).compile();

    controller = module.get<LectorTmoController>(LectorTmoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
