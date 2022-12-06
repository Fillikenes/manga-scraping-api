import { Module } from '@nestjs/common';
import { MangaTigreService } from './manga-tigre.service';
import { MangaTigreController } from './manga-tigre.controller';
import { PuppeteerService } from '../../services/puppeteer/puppeteer.service';
import { HttpService } from '../../services/http/http.service';

@Module({
  providers: [MangaTigreService, PuppeteerService, HttpService],
  controllers: [MangaTigreController],
})
export class MangaTigreModule {}
