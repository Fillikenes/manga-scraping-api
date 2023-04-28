import { Controller, Get, Param, Query } from '@nestjs/common';
import { LectorMangaService } from './lector-manga.service';
import { LectorMangaGetDto, LectorMangaSearchDto } from './dtos';
@Controller('lector-manga')
export class LectorMangaController {
  constructor(private readonly lectorMangaService: LectorMangaService) {}

  @Get('/')
  getManga(@Query() params: LectorMangaGetDto) {
    return this.lectorMangaService.getInfoManga(params.url);
  }

  @Get('/search/:value')
  searchManga(@Param() params: LectorMangaSearchDto) {
    return this.lectorMangaService.searchManga(params.value);
  }
}
