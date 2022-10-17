import { Test, TestingModule } from '@nestjs/testing';
import { TmoLectorNetService } from './tmo-lector-net.service';

describe('TmoLectorNetService', () => {
  let service: TmoLectorNetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TmoLectorNetService],
    }).compile();

    service = module.get<TmoLectorNetService>(TmoLectorNetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
