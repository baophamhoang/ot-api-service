import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInCommand } from './signIn.command';
import { SignInRequestBody } from './signIn.request-body';
import { SignInResponse } from './signIn.response';
import { ResponseInterceptor } from '@/shared';
import { ApiResponse } from '@/libs';

@ApiTags('Auth')
@Controller({ path: 'sign-in', version: '1' })
@UseInterceptors(ResponseInterceptor)
export class SignInEndpoint {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: 'Sign in' })
  @ApiResponse(SignInResponse)
  @Post()
  signIn(@Body() body: SignInRequestBody) {
    return this.commandBus.execute<SignInCommand, SignInResponse>(new SignInCommand(body));
  }
}
