import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { config } = app.get(AppModule);

  await app.listen(config.port);
}
bootstrap();
