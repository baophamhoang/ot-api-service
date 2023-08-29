import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SlackPassportStrategy } from './auth/auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [SlackPassportStrategy],
})
export class AuthGuardModule {}
