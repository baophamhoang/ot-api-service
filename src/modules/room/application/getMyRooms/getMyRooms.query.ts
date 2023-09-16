import { RequestUser } from '@/shared';
import { GetMyRoomsRequestParam } from './getMyRooms.request-param';

export class GetMyRoomsQuery {
  constructor(public readonly param: GetMyRoomsRequestParam, public readonly reqUser: RequestUser) {}
}
