import { Module } from '@nestjs/common';
import { HttpService } from '../../services/http/http.service';
import { TmoLectorNetService } from './tmo-lector-net.service';
import { TmoLectorNetController } from './tmo-lector-net.controller';
import { HtmlParserService } from '../../services/html-parser/html-parser.service';

@Module({
  providers: [TmoLectorNetService, HttpService, HtmlParserService],
  controllers: [TmoLectorNetController],
})
export class TmoLectorNetModule {}
