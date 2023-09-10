import { SlackAuthGuard } from '@/guard/auth/auth.guard';
import { ApiResponse } from '@/libs';
import { ReqUser, RequestUser, ResponseInterceptor } from '@/shared';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMeQuery } from './getMe.query';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(SlackAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller({ path: 'profile', version: '1' })
export class GetMeEndpoint {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get me' })
  @ApiResponse()
  @Get('me')
  get(@ReqUser() reqUser: RequestUser) {
    return this.queryBus.execute<GetMeQuery, void>(new GetMeQuery(reqUser));
  }
}
