import { detachApplication } from '@/utils';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as application from './application';
import { PuppeteerService } from '@/common/puppeteer/puppeteer.service';

const { endpoints, handlers } = detachApplication(Object.values(application));

@Module({
  imports: [CqrsModule],
  controllers: [...endpoints],
  providers: [...handlers, PuppeteerService],
})
export class RoomModule {}
