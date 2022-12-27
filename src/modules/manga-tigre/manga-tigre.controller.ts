import { Controller, Get, Param } from '@nestjs/common';
import { MangaTigreService } from './manga-tigre.service';

@Controller('manga-tigre')
export class MangaTigreController {
  constructor(private readonly mangaTigreService: MangaTigreService) {}

  @Get('/:manga')
  public async getManga(@Param() params: any): Promise<any> {
    return this.mangaTigreService.getManga(params.manga);
  }

  @Get('search/:manga')
  public async searchManga(@Param() params: any): Promise<any> {
    return this.mangaTigreService.searchManga(params.manga);
  }
}
