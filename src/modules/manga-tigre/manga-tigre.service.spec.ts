import { Test, TestingModule } from '@nestjs/testing';
import { MangaTigreService } from './manga-tigre.service';

describe('MangaTigreService', () => {
  let service: MangaTigreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MangaTigreService],
    }).compile();

    service = module.get<MangaTigreService>(MangaTigreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
