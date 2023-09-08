import { ConfigType, registerAs } from '@nestjs/config';
import zod from 'zod';
const configKey = 'slack';

export const slackConfig = registerAs(configKey, () => ({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  issuer: process.env.ISSUER,
  redirectURI: process.env.REDIRECT_URI,
}));

export const slackConfigSchema = zod.object({
  CLIENT_ID: zod.string(),
  CLIENT_SECRET: zod.string(),
  ISSUER: zod.string().default('https://slack.com'),
  REDIRECT_URI: zod.string().min(1),
});

export type SlackConfig = ConfigType<typeof slackConfig>;
