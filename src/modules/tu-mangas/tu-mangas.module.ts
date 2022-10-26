import { Module } from '@nestjs/common';
import { TuMangasService } from './tu-mangas.service';
import { TuMangasController } from './tu-mangas.controller';
import { HttpService } from '../../services/http/http.service';
import { HtmlParserService } from 'src/services/html-parser/html-parser.service';

@Module({
  providers: [TuMangasService, HttpService, HtmlParserService],
  controllers: [TuMangasController],
})
export class TuMangasModule {}
