import { PrismaService } from '@/common/database';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fetch from 'node-fetch';
import { CreateRoomCommand } from './createRoom.command';

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand, void> {
  constructor(private readonly db: PrismaService) {}

  async execute(command: CreateRoomCommand): Promise<void> {
    const {
      reqUser,
      body: { scrapingUrl, dueTime, alias },
    } = command;

    const apiUrl = new URL('https://ot-s.onrender.com/api/scraping');
    apiUrl.searchParams.set('url', encodeURI(scrapingUrl));
    try {
      const response = await fetch(apiUrl.href);
      const scraped = await response.json();

      if (!scraped) {
        throw new BadRequestException('The restaurant url is invalid.');
      }

      await this.db.room.create({
        data: {
          hostId: reqUser.id,
          scrapingUrl,
          alias,
          scrapingData: scraped,
          dueTime,
        },
      });

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
