import { SlackAuthGuard } from '@/guard/auth/auth.guard';
import { ApiResponse } from '@/libs';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from './createUser.command';
import { CreateUserBody } from './createUser.request-body';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(SlackAuthGuard)
@Controller({ path: 'users', version: '1' })
export class CreateUserEndpoint {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ description: 'Create user' })
  @ApiResponse()
  @Post()
  create(@Body() body: CreateUserBody) {
    return this.commandBus.execute<CreateUserCommand, void>(new CreateUserCommand(body));
  }
}
