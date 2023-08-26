import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './modules';
import { CommonModule } from './common';

@Module({
  imports: [ApplicationModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
