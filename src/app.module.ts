import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { HealthModule } from './modules/health/health.module';
import { HttpService } from './services/http/http.service';
import { HtmlParserService } from './services/html-parser/html-parser.service';
import { LectorTmoModule } from './modules/lector-tmo/lector-tmo.module';
import { AnzMangaModule } from './modules/anz-manga/anz-manga.module';
import { InMangaModule } from './modules/in-manga/in-manga.module';
import { LectorMangaModule } from './modules/lector-manga/lector-manga.module';

@Module({
  imports: [
    ConfigModule,
    HealthModule,
    LectorTmoModule,
    AnzMangaModule,
    InMangaModule,
    LectorMangaModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpService, HtmlParserService],
})
export class AppModule {
  public config = this.configService.config;

  constructor(private readonly configService: ConfigService) {}
}
