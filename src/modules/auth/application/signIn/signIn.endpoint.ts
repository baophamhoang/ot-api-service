import { ApiResponse } from '@/libs';
import { ResponseInterceptor } from '@/shared';
import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SignInCommand } from './signIn.command';
import { SignInRequestBody } from './signIn.request-body';
import { SignInResponse } from './signIn.response';

@ApiTags('Auth')
@Controller({ path: 'sign-in', version: '1' })
@UseInterceptors(ResponseInterceptor)
export class SignInEndpoint {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ description: 'Sign in' })
  @ApiResponse(SignInResponse)
  @Post()
  signIn(@Body() body: SignInRequestBody, @Req() req: Request) {
    return this.commandBus.execute<SignInCommand, SignInResponse>(new SignInCommand(body, req.headers.origin));
  }
}
