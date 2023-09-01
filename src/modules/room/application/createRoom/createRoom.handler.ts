import { PuppeteerService } from '@/common/puppeteer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomCommand } from './createRoom.command';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/common/database';

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand, void> {
  constructor(private readonly puppeteerService: PuppeteerService, private readonly db: PrismaService) {}

  async execute(command: CreateRoomCommand): Promise<void> {
    const {
      reqUser,
      body: { scrapingUrl, dueTime, alias },
    } = command;

    const scraped = await this.puppeteerService.scrapeRestaurant(scrapingUrl);

    if (!scraped) {
      throw new BadRequestException('The restaurant url is invalid.');
    }

    const { json } = scraped;
    await this.db.room.create({
      data: {
        hostId: reqUser.id,
        scrapingUrl,
        alias,
        scrapingData: json,
        dueTime,
      },
    });

    return;
  }
}
