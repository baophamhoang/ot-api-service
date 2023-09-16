import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@/common/database';
import { GetMyRoomsQuery } from './getMyRooms.query';
import { GetMyRoomsQueryResponse } from './getMyRooms.response';

@QueryHandler(GetMyRoomsQuery)
export class GetMyRoomsHandler implements IQueryHandler<GetMyRoomsQuery, GetMyRoomsQueryResponse> {
  private readonly logger = new Logger(GetMyRoomsHandler.name);

  constructor(private readonly db: PrismaService) {}

  async execute(query: GetMyRoomsQuery): Promise<GetMyRoomsQueryResponse> {
    return (await this.getMyRooms(query)) as GetMyRoomsQueryResponse;
  }

  private async getMyRooms(query: GetMyRoomsQuery): Promise<GetMyRoomsQueryResponse> {
    const { reqUser } = query;
    const rooms = await this.db.room.findMany({
      where: {
        hostId: reqUser.id,
      },
    });

    return rooms;
  }
}
