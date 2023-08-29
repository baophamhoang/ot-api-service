import { ConfigType, registerAs } from '@nestjs/config';
import zod, { z } from 'zod';

const configKey = 'appState';

export type NodeEnv = 'local' | 'development' | 'production';

export const appStateConfig = registerAs(configKey, () => ({
  nodeEnv: (process.env.NODE_ENV || 'local') as NodeEnv,
  port: process.env.PORT || 3000,
}));

export const appStateConfigSchema = zod.object({
  NODE_ENV: zod.union([z.literal('local'), z.literal('development'), z.literal('production')]).optional(),
  PORT: zod.number().or(zod.string()).default(3000).optional(),
});

export type AppStateConfig = ConfigType<typeof appStateConfig>;
