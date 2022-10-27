import { Controller, Get, Param } from '@nestjs/common';
import { LectorMangaService } from './lector-manga.service';
@Controller('lector-manga')
export class LectorMangaController {
  constructor(private readonly lectorMangaService: LectorMangaService) {}

  @Get('/:manga')
  getManga(@Param() query) {
    return this.lectorMangaService.getInfoManga(query.manga);
  }
}
