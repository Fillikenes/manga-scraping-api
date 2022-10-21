import { Controller, Get, Param } from '@nestjs/common';
import { LectorMangaService } from './lector-manga.service';
@Controller('lector-manga')
export class LectorMangaController {
  constructor(private readonly lectorMangaService: LectorMangaService) {}

  @Get('/:manga')
  async getManga(@Param() query) {
    // console.log('a', query.manga);
    return await this.lectorMangaService.getInfoManga(query.manga);
  }
}
