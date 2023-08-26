import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import { CreateUserBody } from './createUser.request-body';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, any> {
  execute(command: CreateUserCommand) {
    return command.body as any;
  }
}
