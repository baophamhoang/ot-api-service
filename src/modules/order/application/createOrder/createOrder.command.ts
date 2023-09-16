import { RequestUser } from '@/shared';
import { CreateOrderRequestBody } from './createOrder.request-body';

export class CreateOrderCommand {
  constructor(public readonly reqUser: RequestUser, public readonly body: CreateOrderRequestBody) {}
}
