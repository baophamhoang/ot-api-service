import { PrismaService } from '@/common/database';
import { ConfigService } from '@/configs';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Profile, User } from '@prisma/client';
import { GetMeQuery } from './getMe.query';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery, User & Partial<Profile>> {
  constructor(private readonly db: PrismaService, private readonly config: ConfigService) {}

  async execute(query: GetMeQuery): Promise<User & Partial<Profile>> {
    const { reqUser } = query;
    const user = await this.db.user.findFirst({
      where: { id: reqUser.id },
      include: { profile: { select: { avatarUrl: true } } },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
