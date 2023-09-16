import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetMyRoomsQuery } from './getMyRooms.query';
import { GetMyRoomsRequestParam } from './getMyRooms.request-param';
import { GetMyRoomsQueryResponse } from './getMyRooms.response';
import { ReqUser, RequestUser, ResponseInterceptor } from '@/shared';
import { ApiResponse } from '@/libs';
import { SlackAuthGuard } from '@/guard/auth/auth.guard';

@ApiTags('Room')
@ApiBearerAuth()
@Controller({ path: 'rooms', version: '1' })
@UseGuards(SlackAuthGuard)
@UseInterceptors(ResponseInterceptor)
export class GetMyRoomsEndpoint {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get my rooms' })
  @ApiResponse()
  @Get('me')
  get(@Param() param: GetMyRoomsRequestParam, @ReqUser() reqUser: RequestUser): Promise<GetMyRoomsQueryResponse> {
    return this.queryBus.execute<GetMyRoomsQuery, GetMyRoomsQueryResponse>(new GetMyRoomsQuery(param, reqUser));
  }
}
