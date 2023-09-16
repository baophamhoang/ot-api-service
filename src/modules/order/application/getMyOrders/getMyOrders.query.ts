import { RequestUser } from '@/shared';

export class GetMyOrdersQuery {
  constructor(public readonly reqUser: RequestUser) {}
}
