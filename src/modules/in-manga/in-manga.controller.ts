import { Controller, Get, Param } from '@nestjs/common';
import { InMangaService } from './in-manga.service';
import { InMangaParamDto } from './dto';
import { IMangaInformation, ISearchResponse } from './models';

@Controller('in-manga')
export class InMangaController {
  constructor(private readonly inMangaService: InMangaService) {}

  @Get('/:manga')
  public async getManga(
    @Param() query: InMangaParamDto,
  ): Promise<IMangaInformation> {
    return this.inMangaService.getManga(query.manga);
  }

  @Get('search/:manga')
  public async searchManga(
    @Param() params: InMangaParamDto,
  ): Promise<ISearchResponse> {
    return this.inMangaService.searchManga(params.manga);
  }
}
