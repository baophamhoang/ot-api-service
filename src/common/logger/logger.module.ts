import { ConfigModule, ConfigService } from '@/configs';
import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level: 'debug',
            customProps: (req) => ({
              reqUserId: req?.id, // TODO: replace to req.user.id
            }),
            transport: config.nodeEnv === 'local' ? { target: 'pino-pretty' } : undefined,
            redact: {
              paths: ['req.headers.authorization', 'req.headers.cookie'],
              censor: (_, path) => (path?.includes('authorization') ? 'Bearer ***' : '***'),
            },
            serializers: {
              req: (req) => {
                req.body = req.raw.body;
                return req;
              },
            },
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
