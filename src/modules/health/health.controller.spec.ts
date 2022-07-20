import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            liveness: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('health', () => {
    it('should return "OK"', () => {
      const response = {
        status: 'OK',
        version: '0.0.1',
      };

      const livenessSpy = jest
        .spyOn(service, 'liveness')
        .mockReturnValue(response);

      expect(controller.health()).toEqual(response);
      expect(livenessSpy).toHaveBeenCalledTimes(1);
    });
  });
});
