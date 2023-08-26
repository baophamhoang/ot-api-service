import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocs } from './libs';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  SwaggerDocs.assign(app);

  await app.listen(3000);
}
bootstrap();
