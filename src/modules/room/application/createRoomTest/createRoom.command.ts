import { RequestUser } from '@/shared';
import { CreateRoomRequestBody } from './createRoom.request-body';

export class CreateRoomCommand {
  constructor(public readonly reqUser: RequestUser, public readonly body: CreateRoomRequestBody) {}
}
