import { Controller, Get } from '@nestjs/common';
import { TmoLectorNetService } from './tmo-lector-net.service';

@Controller('tmo-lector-net')
export class TmoLectorNetController {
  constructor(private readonly tmoLectorNetService: TmoLectorNetService) {}

  @Get('/')
  public async getManga(): Promise<any> {
    const url = 'https://tmolector.net/manga/one-punch-man';
    return this.tmoLectorNetService.getPage(url);
  }
}
