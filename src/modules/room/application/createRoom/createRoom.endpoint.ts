import { SlackAuthGuard } from '@/guard/auth/auth.guard';
import { ApiResponse } from '@/libs';
import { ReqUser, RequestUser, ResponseInterceptor } from '@/shared';
import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoomCommand } from './createRoom.command';
import { CreateRoomRequestBody } from './createRoom.request-body';

@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(SlackAuthGuard)
@UseInterceptors(ResponseInterceptor)
@Controller({ path: 'rooms', version: '1' })
export class CreateRoomEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Create room' })
  @ApiResponse()
  @Post()
  create(@Body() body: CreateRoomRequestBody, @ReqUser() reqUser: RequestUser) {
    return this.commandBus.execute<CreateRoomCommand, void>(new CreateRoomCommand(reqUser, body));
  }
}
