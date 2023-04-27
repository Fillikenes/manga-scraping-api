import { Controller, Get, Param } from '@nestjs/common';
import { InMangaService } from './in-manga.service';
import { InMangaParamDto } from './dto';
import {
  IBaseController,
  IOutboundChapter,
  IOutboundSearchResponse,
} from '../../interfaces';

@Controller('in-manga')
export class InMangaController implements IBaseController {
  constructor(private readonly inMangaService: InMangaService) {}

  @Get('/:manga')
  public async get(
    @Param() query: InMangaParamDto,
  ): Promise<IOutboundChapter[]> {
    return this.inMangaService.getManga(query.manga);
  }

  @Get('search/:manga')
  public async search(
    @Param() params: InMangaParamDto,
  ): Promise<IOutboundSearchResponse[]> {
    return this.inMangaService.searchManga(params.manga);
  }
}
