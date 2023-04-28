import { Controller, Get, Param, Query } from '@nestjs/common';
import { TuMangasGetListDto } from './dtos';
import { TuMangasService } from './tu-mangas.service';
import { TuMangasSearchDto } from './dtos/tu-mangas-query.dto';
import {
  IBaseController,
  IOutboundChapter,
  IOutboundSearchResponse,
} from '../../interfaces';

@Controller('tu-mangas')
export class TuMangasController implements IBaseController {
  constructor(private readonly tumangasService: TuMangasService) {}

  @Get('/')
  async get(@Query() query: TuMangasGetListDto): Promise<IOutboundChapter[]> {
    return this.tumangasService.getMangaInfo(query.url);
  }
  @Get('/search/:value')
  async search(
    @Param() params: TuMangasSearchDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.tumangasService.searchManga(params.value);
  }
}
