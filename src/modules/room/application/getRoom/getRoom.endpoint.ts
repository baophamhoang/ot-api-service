import { SlackAuthGuard } from '@/guard/auth/auth.guard';
import { ApiResponse } from '@/libs';
import { ResponseInterceptor } from '@/shared';
import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetRoomQuery } from './getRoom.query';
import { GetRoomRequestQuery } from './getRoom.request-query';

@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(SlackAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller({ path: 'rooms', version: '1' })
export class GetRoomEndpoint {
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get room by Id' })
  @ApiResponse()
  @Get(':id')
  get(@Param() query: GetRoomRequestQuery) {
    return this.queryBus.execute<GetRoomQuery, void>(new GetRoomQuery(query.id));
  }
}
