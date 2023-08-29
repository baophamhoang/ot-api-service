import { ConfigType, registerAs } from '@nestjs/config';
import zod from 'zod';
const configKey = 'slack';

export const slackConfig = registerAs(configKey, () => ({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  issuer: process.env.ISSUER || 'https://slack.com',
}));

export const slackConfigSchema = zod.object({
  CLIENT_ID: zod.string(),
  CLIENT_SECRET: zod.string(),
  ISSUER: zod.string().optional(),
});

export type SlackConfig = ConfigType<typeof slackConfig>;
