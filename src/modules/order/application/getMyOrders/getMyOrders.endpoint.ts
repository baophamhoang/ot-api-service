import { SlackAuthGuard } from '@/guard/auth/auth.guard';
import { ApiResponse } from '@/libs';
import { ReqUser, RequestUser, ResponseInterceptor } from '@/shared';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMyOrdersQuery } from './getMyOrders.query';
import { GetMyOrdersQueryResponse } from './getMyOrders.response';

@ApiTags('Order')
@ApiBearerAuth()
@Controller({ path: 'orders', version: '1' })
@UseInterceptors(ResponseInterceptor)
@UseGuards(SlackAuthGuard)
export class GetMyOrdersEndpoint {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get my orders' })
  @ApiResponse(GetMyOrdersQueryResponse)
  @Get('me')
  get(@ReqUser() reqUser: RequestUser): Promise<GetMyOrdersQueryResponse> {
    return this.queryBus.execute<GetMyOrdersQuery, GetMyOrdersQueryResponse>(new GetMyOrdersQuery(reqUser));
  }
}
