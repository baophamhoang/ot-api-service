import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AuthGuardTypeKey = 'Slack';

@Injectable()
export class SlackAuthGuard extends AuthGuard(AuthGuardTypeKey) {}
