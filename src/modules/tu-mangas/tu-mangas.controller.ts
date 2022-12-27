import { Controller, Get, Param, Query } from '@nestjs/common';
import { TuMangasGetListDto } from './dto';
import { TuMangasService } from './tu-mangas.service';
import { TuMangasSearchDto } from './dto/tu-mangas-query.dto';

@Controller('tu-mangas')
export class TuMangasController {
  constructor(private readonly tumangasService: TuMangasService) {}
  @Get('/')
  async getListCharacters(@Query() query: TuMangasGetListDto): Promise<any> {
    return this.tumangasService.getMangaInfo(query.name);
  }
  @Get('/search/:nameManga')
  async searchManga(@Param() params: TuMangasSearchDto): Promise<any> {
    return this.tumangasService.searchManga(params.nameManga);
  }
}
