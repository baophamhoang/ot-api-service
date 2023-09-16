import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SlackAuthGuard } from '@/guard/auth/auth.guard';
import { ApiResponse } from '@/libs';
import { ReqUser, RequestUser, ResponseInterceptor } from '@/shared';
import { CreateOrderCommand } from './createOrder.command';
import { CreateOrderRequestBody } from './createOrder.request-body';

@ApiTags('Order')
@ApiBearerAuth()
@Controller({ path: 'orders', version: '1' })
@UseInterceptors(ResponseInterceptor)
@UseGuards(SlackAuthGuard)
export class CreateOrderEndpoint {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: 'Create order' })
  @ApiResponse()
  @Post()
  create(@ReqUser() reqUser: RequestUser, @Body() body: CreateOrderRequestBody): Promise<void> {
    return this.commandBus.execute<CreateOrderCommand, void>(new CreateOrderCommand(reqUser, body));
  }
}
