import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { HealthModule } from './modules/health/health.module';
import { LectorTmoModule } from './modules/lector-tmo/lector-tmo.module';
import { HttpService } from './services/http/http.service';

@Module({
  imports: [ConfigModule, HealthModule, LectorTmoModule],
  controllers: [AppController],
  providers: [AppService, HttpService],
})
export class AppModule {
  public config = this.configService.config;

  constructor(private readonly configService: ConfigService) {}
}
