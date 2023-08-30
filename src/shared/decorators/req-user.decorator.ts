import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface RequestUser {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  auth_time: number;
  nonce: string;
  at_hash: string;
  'https://slack.com/team_id': string;
  'https://slack.com/user_id': string;
  email: string;
  email_verified: boolean;
  date_email_verified: number;
  locale: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  'https://slack.com/team_name': string;
  'https://slack.com/team_domain': string;
  'https://slack.com/team_image_230': string;
  'https://slack.com/team_image_default': boolean;
}

export const ReqUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as RequestUser;
});
