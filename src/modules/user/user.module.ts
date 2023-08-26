import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as application from './application';

const apis = Object.values(application);

const endpoints = apis.filter((x) => x.name.endsWith('Endpoint'));
const handlers = apis.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [CqrsModule],
  controllers: [...endpoints],
  providers: [...handlers],
})
export class UserModule {}
