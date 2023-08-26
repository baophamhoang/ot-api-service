import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import { CreateUserBody } from './createUser.request-body';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/libs';

@ApiTags('User')
@ApiBearerAuth()
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
