import { SignInRequestBody } from './signIn.request-body';

export class SignInCommand {
  constructor(public readonly body: SignInRequestBody, public readonly origin: string) {}
}
