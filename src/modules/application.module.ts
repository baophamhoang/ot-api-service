import { ConfigService } from '@/configs';
import { BypassAuthguardMiddleware } from '@/middleware/bypass-authguard.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth';
import { OrderModule } from './order';
import { ProfileModule } from './profile';
import { RoomModule } from './room';

@Module({
  imports: [AuthModule, ProfileModule, RoomModule, OrderModule],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    if (this.configService.DEV_MODE) {
      consumer.apply(BypassAuthguardMiddleware).forRoutes('*');
    }
  }
}
