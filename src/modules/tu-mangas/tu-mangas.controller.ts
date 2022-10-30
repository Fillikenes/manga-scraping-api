import { Controller, Get, Query } from '@nestjs/common';
import { TuMangasService } from './tu-mangas.service';

@Controller('tu-mangas')
export class TuMangasController {
  constructor(private readonly tumangasService: TuMangasService) {}
  @Get('/')
  async getListCharacters(@Query() query): Promise<any> {
    return this.tumangasService.getMangaInfo(query.name);
  }
}
