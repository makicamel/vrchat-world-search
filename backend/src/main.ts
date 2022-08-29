import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  app.enableCors({ origin: config.get('FRONTEND_URL') });
  await app.listen(process.env.PORT || config.get('BACKEND_PORT') || 3000);
}
bootstrap();
