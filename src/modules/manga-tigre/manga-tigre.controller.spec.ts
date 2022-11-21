import { Test, TestingModule } from '@nestjs/testing';
import { MangaTigreController } from './manga-tigre.controller';

describe('MangaTigreController', () => {
  let controller: MangaTigreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MangaTigreController],
    }).compile();

    controller = module.get<MangaTigreController>(MangaTigreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
