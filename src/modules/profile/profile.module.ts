import { Module } from '@nestjs/common';
import * as application from './application';
import { detachApplication } from '@/utils';
import { CqrsModule } from '@nestjs/cqrs';

const { endpoints, handlers } = detachApplication(Object.values(application));

@Module({
  imports: [CqrsModule],
  controllers: [...endpoints],
  providers: [...handlers],
})
export class ProfileModule {}
