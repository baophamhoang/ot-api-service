import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { RoomModule } from './room';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, UserModule, RoomModule],
})
export class ApplicationModule {}
