import { PrismaService } from '@/common/database';
import { ScrapingData, ScrapingDish } from '@/shared';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Prisma, Room } from '@prisma/client';
import { CreateOrderCommand } from './createOrder.command';
import { OrderDishBody } from './createOrder.request-body';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand, void> {
  private readonly logger = new Logger(CreateOrderHandler.name);

  constructor(private readonly dbContext: PrismaService) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    return await this.createOrder(command);
  }

  private async createOrder(command: CreateOrderCommand): Promise<void> {
    const { reqUser, body } = command;

    const room = await this.dbContext.room.findFirst({
      where: { id: body.roomId },
    });

    if (!room) {
      throw new NotFoundException('Room does not exist.');
    }

    const foundOrder = await this.dbContext.userToRoom.findFirst({
      where: { userId: reqUser.id, roomId: body.roomId },
    });

    if (foundOrder) {
      throw new BadRequestException('Can create only 1 order each room');
    }

    const scrapingDishes = this.getScrapingDishes(room);

    const dishes = this.getValidDishes({ scrapingDishes, bodyDishes: body.dishes });

    const price = this.getTotalPrice(dishes);

    await this.dbContext.$transaction(async (trx) => {
      const newOrder = await trx.order.create({
        data: {
          room: {
            connect: { id: body.roomId },
          },
          user: {
            connect: { id: reqUser.id },
          },
        },
      });

      await trx.orderDetail.create({
        data: {
          id: newOrder.id,
          dishes: dishes as unknown as Prisma.JsonArray,
          price: price,
        },
      });

      await trx.userToRoom.create({
        data: {
          roomId: body.roomId,
          userId: reqUser.id,
        },
      });

      this.logger.log(`Create new order: ${newOrder.id} for user: ${newOrder.userId} at room: ${newOrder.roomId}`);
    });
  }

  private getScrapingDishes(room: Room) {
    const restaurantId = room.restaurantId;
    const data = room.scrapingData as unknown as ScrapingData;
    const scrapingDishes = data.entities[restaurantId].menu.categories.flatMap((cate) => cate.items);
    return scrapingDishes;
  }

  private getValidDishes({
    scrapingDishes,
    bodyDishes,
  }: {
    scrapingDishes: ScrapingDish[];
    bodyDishes: OrderDishBody[];
  }) {
    const bodyDishIds = bodyDishes.map((d) => d.id);
    const realDishes = scrapingDishes.filter((value) => bodyDishIds.includes(value.ID));

    if (realDishes.length !== bodyDishes.length) {
      throw new BadRequestException('Dish does not exist');
    }

    return realDishes.map((rD) => ({
      ...rD,
      quantity: bodyDishes.find((d) => d.id === rD.ID).quantity,
    }));
  }

  private getTotalPrice(dishes: Array<ScrapingDish & { quantity: number }>) {
    return dishes.reduce(
      (result, currentDish) => (result += currentDish.priceV2.amountInMinor * currentDish.quantity),
      0,
    );
  }
}
