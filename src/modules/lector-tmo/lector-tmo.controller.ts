import { Controller, Get } from '@nestjs/common';
import { LectorTmoService } from './lector-tmo.service';

@Controller('lector-tmo')
export class LectorTmoController {
  constructor(private readonly lectorTmoService: LectorTmoService) {}
  @Get()
  async getData() {
    return await this.lectorTmoService.foo();
  }
}
