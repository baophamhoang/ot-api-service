import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { ProfileModule } from './profile';
import { RoomModule } from './room';
import { OrderModule } from './order';
// import { UserModule } from './user';

@Module({
  imports: [AuthModule, ProfileModule, RoomModule, OrderModule],
})
export class ApplicationModule {}
