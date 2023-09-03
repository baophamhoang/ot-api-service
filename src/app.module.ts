import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { ConfigModule } from './configs';
import { AuthGuardModule } from './guard';
import { ApplicationModule } from './modules';

@Module({
  imports: [CommonModule, ConfigModule, ApplicationModule, AuthGuardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
