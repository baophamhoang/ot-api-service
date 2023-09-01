import { SlackAuthGuard } from '@/guard/auth/auth.guard';
import { ApiResponse } from '@/libs';
import { ResponseInterceptor } from '@/shared';
import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetRoomsQuery } from './getRooms.query';
import { GetRoomsRequestQuery } from './getRooms.request-query';

@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(SlackAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller({ path: 'rooms', version: '1' })
export class GetRoomsEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Get rooms' })
  @ApiResponse()
  @Get()
  get(@Query() requestQuery: GetRoomsRequestQuery) {
    return this.commandBus.execute<GetRoomsQuery, void>(new GetRoomsQuery(requestQuery));
  }
}
