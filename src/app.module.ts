import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './modules';
import { CommonModule } from './common';
import { AuthGuardModule } from './guard';
import { ConfigModule } from './configs';

@Module({
  imports: [ApplicationModule, CommonModule, AuthGuardModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
