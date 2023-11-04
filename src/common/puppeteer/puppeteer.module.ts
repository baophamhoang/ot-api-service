import { PuppeteerService } from './puppeteer.service';
import { DynamicModule, Module, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// TODO: Define pupeteer module instead
export interface PuppeteerModuleAsyncParams extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (...args: any[]) => any;
  inject?: Type[];
}

@Module({
  providers: [PuppeteerService],
})
export class PuppeteerModule {}
