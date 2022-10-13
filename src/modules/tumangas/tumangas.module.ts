import { Module } from '@nestjs/common';
import { TumangasService } from './tumangas.service';
import { TumangasController } from './tumangas.controller';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from 'src/services/html-parser/html-parser.service';

@Module({
  providers: [TumangasService, HttpService, HtmlParserService],
  controllers: [TumangasController],
})
export class TumangasModule {}
