import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { LoggerModule } from './logger';

@Module({
  imports: [DatabaseModule, LoggerModule],
})
export class CommonModule {}
