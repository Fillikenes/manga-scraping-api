import { Controller, Get, Query } from '@nestjs/common';
import { TumangasService } from './tumangas.service';

@Controller('tumangas')
export class TumangasController {
  constructor(private readonly tumangasService: TumangasService) {}
  @Get('/')
  async getListCharacters(@Query() query): Promise<any> {
    return this.tumangasService.getMangaInfo(query.name);
  }
}
