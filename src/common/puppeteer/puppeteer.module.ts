// import { PuppeteerService } from './puppeteer.service';
// import { DynamicModule, Module, ModuleMetadata, Provider, Type } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// // TODO: Define pupeteer module instead
// export interface PuppeteerModuleAsyncParams extends Pick<ModuleMetadata, 'imports' | 'providers'> {
//   useFactory: (...args: any[]) => any;
//   inject?: Type[];
// }

// @Module({})
// export class PuppeteerModule {
//   public static forRootAsync(options: PuppeteerModuleAsyncParams): DynamicModule {
//     return {
//       module: PuppeteerModule,
//       imports: options.imports,
//       providers: [options.useFactory()],
//       exports: [PuppeteerService],
//     };
//   }
// }
