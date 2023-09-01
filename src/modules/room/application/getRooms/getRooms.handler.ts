import { PrismaService } from '@/common/database';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetRoomsQuery } from './getRooms.query';

@CommandHandler(GetRoomsQuery)
export class GetRoomsHandler implements ICommandHandler<GetRoomsQuery, any> {
  constructor(private readonly db: PrismaService) {}

  async execute(query: GetRoomsQuery): Promise<any> {
    const rooms = await this.db.room.findMany({
      select: {
        alias: true,
        createdAt: true,
        dueTime: true,
        scrapingData: true,
        host: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
            fullName: true,
            email: true,
            profile: { select: { avatarUrl: true } },
          },
        },
        members: {
          select: {
            user: { include: { profile: { select: { avatarUrl: true } } } },
          },
        },
      },
    });
    return rooms;
  }
}
