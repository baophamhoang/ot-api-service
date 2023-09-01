import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ConfigService } from './configs';
import { SwaggerDocs } from './libs';
import { ApplicationExceptionFilter, HttpExceptionFilter } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.prefix);
  app.enableVersioning();

  // logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // swagger
  SwaggerDocs.assign(app);

  // filter
  app.useGlobalFilters(new HttpExceptionFilter(), new ApplicationExceptionFilter());

  // validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(config.port);

  const url = await app.getUrl();
  logger.debug(`Application is running on env: ${config.nodeEnv}. url: ${url}`);
}
bootstrap();
