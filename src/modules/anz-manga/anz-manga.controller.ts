import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  IBaseController,
  IOutboundChapter,
  IOutboundSearchResponse,
} from '../../interfaces';
import { AnzMangaService } from './anz-manga.service';
import { AnzMangaQueryDto, AnzMangaSearchDto } from './dtos';

@Controller('anz-manga')
export class AnzMangaController implements IBaseController {
  constructor(private readonly anzMangaService: AnzMangaService) {}

  @Get('/')
  public async get(
    @Query() params: AnzMangaQueryDto,
  ): Promise<IOutboundChapter[]> {
    return this.anzMangaService.getPage(params.url);
  }

  @Get('search/:value')
  public async search(
    @Param() params: AnzMangaSearchDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.anzMangaService.search(params.value);
  }
}
