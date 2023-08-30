import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from './signIn.command';
import { SlackService } from '@/libs';
import { SignInResponse } from './signIn.response';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand, SignInResponse> {
  constructor(private readonly slackService: SlackService) {}

  async execute(command: SignInCommand): Promise<SignInResponse> {
    const {
      body: { code },
    } = command;
    try {
      const { id_token: idToken } = await this.slackService.getToken(code);
      return { accessToken: idToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
