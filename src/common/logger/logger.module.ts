import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        customProps: (req) => ({
          reqUserId: req?.id, // TODO: replace to req.user.id
        }),
        transport: { target: 'pino-pretty' }, // TODO: Apply local only in local env
        redact: {
          paths: ['req.headers.authorization', 'req.headers.cookie'],
          censor: (_, paths) => (paths.includes('authorization') ? 'Bearer ***' : '***'),
        },
        serializers: {
          req: (req) => {
            req.body = req.raw.body;
            return req;
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
