import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { ProfileModule } from './profile';
import { RoomModule } from './room';
// import { UserModule } from './user';

@Module({
  imports: [AuthModule, RoomModule, ProfileModule],
})
export class ApplicationModule {}
