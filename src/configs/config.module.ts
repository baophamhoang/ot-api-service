import { combineSchemas } from '@/utils';
import { Global, Module } from '@nestjs/common';
import { ConfigFactory, ConfigModule as NestConfigModule } from '@nestjs/config';
import { apiConfig, apiConfigSchema } from './api';
import { appStateConfig, appStateConfigSchema } from './app-state';
import { ConfigService } from './config.service';
import { slackConfig, slackConfigSchema } from './slack';

const configs: ConfigFactory[] = [slackConfig, appStateConfig, apiConfig];
const validationSchema = combineSchemas(slackConfigSchema, appStateConfigSchema, apiConfigSchema);

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
