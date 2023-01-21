import { Controller, Get, Param, Query } from '@nestjs/common';
import { TuMangasGetListDto } from './dto';
import { TuMangasService } from './tu-mangas.service';
import { TuMangasSearchDto } from './dto/tu-mangas-query.dto';
import {
  IBaseController,
  IOutboundChapter,
  IOutboundSearchResponse,
} from 'src/interfaces';

@Controller('tu-mangas')
export class TuMangasController implements IBaseController {
  constructor(private readonly tumangasService: TuMangasService) {}
  @Get('/')
  async get(@Query() query: TuMangasGetListDto): Promise<IOutboundChapter[]> {
    return this.tumangasService.getMangaInfo(query.name);
  }
  @Get('/search/:nameManga')
  async search(
    @Param() params: TuMangasSearchDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.tumangasService.searchManga(params.nameManga);
  }
}
