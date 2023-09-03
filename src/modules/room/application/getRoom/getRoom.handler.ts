import { PrismaService } from '@/common/database';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoomQuery } from './getRoom.query';
import { GetRoomRequestQuery } from './getRoom.request-query';

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements ICommandHandler<GetRoomRequestQuery, any> {
  constructor(private readonly db: PrismaService) {}

  async execute(query: GetRoomRequestQuery): Promise<any> {
    const room = await this.db.room.findFirst({
      where: {
        id: query.id,
      },
      include: {
        host: {
          select: {
            firstName: true,
            lastName: true,
            fullName: true,
            email: true,
            id: true,
            profile: true,
          },
        },
        members: {
          select: {
            user: true,
          },
        },
      },
    });
    return room;
  }
}
