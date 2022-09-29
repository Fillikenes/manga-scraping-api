import { Controller, Get, Query } from '@nestjs/common';
import { TmoQueryDto } from './dto';
import { LectorTmoService } from './lector-tmo.service';

@Controller('lector-tmo')
export class LectorTmoController {
  constructor(private readonly lectorTmoService: LectorTmoService) {}

  @Get()
  async getData(@Query() tmoQueryDto: TmoQueryDto): Promise<any> {
    return await this.lectorTmoService.getImagesChapter(tmoQueryDto.url);
  }
}
