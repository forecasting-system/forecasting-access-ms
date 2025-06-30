import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Forecast Access MS Main');

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);

  logger.log(`Forecast Access MS is listening on port ${envs.port}`);
}
bootstrap();
