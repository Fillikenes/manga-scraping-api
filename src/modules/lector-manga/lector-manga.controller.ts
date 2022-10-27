import { Controller, Get, Param } from '@nestjs/common';
import { LectorMangaService } from './lector-manga.service';
@Controller('lector-manga')
export class LectorMangaController {
  constructor(private readonly lectorMangaService: LectorMangaService) {}

  @Get('/:manga')
  async getManga(@Param() query) {
    return await this.lectorMangaService.getInfoManga(query.manga);
  }
}
