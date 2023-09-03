import { ConfigType, registerAs } from '@nestjs/config';
import zod, { z } from 'zod';

const configKey = 'serviceAPI';

export const serviceConfig = registerAs(configKey, () => ({
  scrapingSvc: process.env.SCRAPING_SVC,
}));

export const serviceConfigSchema = zod.object({
  SCRAPING_SVC: zod.string().min(1),
});

export type ServiceConfig = ConfigType<typeof serviceConfig>;
