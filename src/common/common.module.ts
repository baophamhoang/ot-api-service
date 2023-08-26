import { Module } from '@nestjs/common';
import { LoggerModule } from './logger';

@Module({
  imports: [LoggerModule],
})
export class CommonModule {}
