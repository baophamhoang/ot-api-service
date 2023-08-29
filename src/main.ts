import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocs } from './libs';
import { Logger } from 'nestjs-pino';
import { ConfigService } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  app.useLogger(logger);

  SwaggerDocs.assign(app);

  const config = app.get(ConfigService);

  await app.listen(config.port);

  const url = await app.getUrl();
  logger.debug(`Application is running on env: ${config.nodeEnv}. url: ${url}`);
}
bootstrap();
