import { RequestUser } from '@/shared';

export class GetMeQuery {
  constructor(public readonly reqUser: RequestUser) {}
}
