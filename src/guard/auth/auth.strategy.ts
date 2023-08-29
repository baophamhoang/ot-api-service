import { ConfigService } from '@/configs';
import { RequestUser } from '@/shared';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuardTypeKey } from './auth.guard';

@Injectable()
export class SlackPassportStrategy extends PassportStrategy(Strategy, AuthGuardTypeKey) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.issuer}/openid/connect/keys`,
        handleSigningKeyError(err, cb) {
          cb(err);
        },
      }),
      ignoreExpiration: true,
      algorithms: ['RS256'],
    });
  }

  public validate(...args: any[]) {
    const decodedJwt = args[0] as RequestUser;
    return { ...decodedJwt };
  }
}
