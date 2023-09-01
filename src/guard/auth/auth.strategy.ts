import { ConfigService } from '@/configs';
import { SlackUser } from '@/shared';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuardTypeKey } from './auth.guard';
import { PrismaService } from '@/common/database';

@Injectable()
export class SlackPassportStrategy extends PassportStrategy(Strategy, AuthGuardTypeKey) {
  constructor(private readonly config: ConfigService, private readonly db: PrismaService) {
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

  public async validate(...args: any[]) {
    const decodedJwt = args[0] as SlackUser;
    const user = await this.db.user.findFirst({
      where: {
        sub: decodedJwt.sub,
        email: decodedJwt.email,
      },
    });

    return { ...decodedJwt, id: user.id };
  }
}
