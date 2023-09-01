import { PrismaService } from '@/common/database/prisma.service';
import { SlackService } from '@/libs';
import { RequestUser, UserRole } from '@/shared';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { decode } from 'jsonwebtoken';
import { SignInCommand } from './signIn.command';
import { SignInResponse } from './signIn.response';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand, SignInResponse> {
  constructor(private readonly slackService: SlackService, private db: PrismaService) {}

  async execute(command: SignInCommand): Promise<SignInResponse> {
    const {
      body: { code },
    } = command;
    let idToken: string = null;
    try {
      const { id_token } = await this.slackService.getToken(code);
      idToken = id_token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    await this.createUser(idToken);

    return { accessToken: idToken };
  }

  async createUser(idToken: string) {
    const DEFAULT_ROLES = [UserRole.User];
    const userInfo = decode(idToken) as RequestUser;
    const roles = await this.db.role.findMany({
      where: {
        name: {
          in: DEFAULT_ROLES,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const user = await this.db.user.findFirst({
      where: { sub: userInfo.sub, email: userInfo.email },
    });

    if (user) {
      return;
    }

    await this.db.user.create({
      data: {
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        fullName: userInfo.name,
        username: userInfo.email,
        email: userInfo.email,
        profile: {
          create: {
            avatarUrl: userInfo.picture,
          },
        },
        roles: {
          createMany: {
            data: roles.map((r) => ({ roleId: r.id })),
            skipDuplicates: true,
          },
        },
        sub: userInfo.sub,
      },
    });
  }
}
