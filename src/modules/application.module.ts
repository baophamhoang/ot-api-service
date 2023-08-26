import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user';

@Module({
  imports: [UserModule],
})
export class ApplicationModule {}
