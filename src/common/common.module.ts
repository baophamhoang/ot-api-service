import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { LoggerModule } from './logger';
import { PuppeteerModule } from './puppeteer/puppeteer.module';

@Module({
  imports: [DatabaseModule, LoggerModule, PuppeteerModule],
})
export class CommonModule {}
