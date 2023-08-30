import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInRequestBody } from './signIn.request-body';
import { SignInCommand } from './signIn.command';
import { SignInResponse } from './signIn.response';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: 'sign-in', version: '1' })
export class SignInEndpoint {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: 'Sign in' })
  @Post()
  signIn(@Body() body: SignInRequestBody) {
    return this.commandBus.execute<SignInCommand, SignInResponse>(new SignInCommand(body));
  }
}
