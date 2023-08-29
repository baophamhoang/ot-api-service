import { combineSchemas } from '@/utils';
import { Global, Module } from '@nestjs/common';
import { ConfigFactory, ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { slackConfig, slackConfigSchema } from './slack';
import { appStateConfig, appStateConfigSchema } from './app-state';

const configs: ConfigFactory[] = [slackConfig, appStateConfig];
const validationSchema = combineSchemas(slackConfigSchema, appStateConfigSchema);

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknow: false,
        abortEarly: true,
      },
      validate: (config) => {
        return validationSchema.parse(config);
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
