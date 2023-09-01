import { ConfigType, registerAs } from '@nestjs/config';
import zod from 'zod';

const configKey = 'api';

export const apiConfig = registerAs(configKey, () => ({
  prefix: process.env.API_PREFIX,
  version: process.env.API_VERSION,
}));

export const apiConfigSchema = zod.object({
  API_PREFIX: zod.string().default('api-svc'),
  API_VERSION: zod.string().default('v1'),
});

export type ApiConfig = ConfigType<typeof apiConfig>;
