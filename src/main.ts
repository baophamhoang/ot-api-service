import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ConfigService } from './configs';
import { SwaggerDocs } from './libs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // swagger
  SwaggerDocs.assign(app);

  // validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(ConfigService);

  await app.listen(config.port);

  const url = await app.getUrl();
  logger.debug(`Application is running on env: ${config.nodeEnv}. url: ${url}`);
}
bootstrap();
