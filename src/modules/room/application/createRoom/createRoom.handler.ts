import { PrismaService } from '@/common/database';
import { ConfigService } from '@/configs';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fetch from 'node-fetch';
import { CreateRoomCommand } from './createRoom.command';

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand, void> {
  constructor(private readonly db: PrismaService, private readonly config: ConfigService) {}

  async execute(command: CreateRoomCommand): Promise<void> {
    const {
      reqUser,
      body: { scrapingUrl, dueTime, alias },
    } = command;

    const apiUrl = new URL(this.config.scrapingSvc);
    apiUrl.searchParams.set('url', encodeURI(scrapingUrl));
    try {
      const response = await fetch(apiUrl.href);
      const scraped = await response.json();

      if (!scraped || !scraped.activeMerchantID) {
        throw new BadRequestException('The restaurant url is invalid.');
      }

      await this.db.room.create({
        data: {
          hostId: reqUser.id,
          scrapingUrl,
          alias,
          scrapingData: scraped,
          dueTime,
          restaurantId: scraped.activeMerchantID,
        },
      });

      return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
