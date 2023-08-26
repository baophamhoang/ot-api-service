import { CreateUserBody } from './createUser.request-body';

export class CreateUserCommand {
  constructor(public readonly body: CreateUserBody) {}
}
