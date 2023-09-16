import { PrismaService } from '@/common/database';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMyOrdersQuery } from './getMyOrders.query';
import { GetMyOrdersQueryResponse } from './getMyOrders.response';

@QueryHandler(GetMyOrdersQuery)
export class GetMyOrdersHandler implements IQueryHandler<GetMyOrdersQuery, GetMyOrdersQueryResponse> {
  private readonly logger = new Logger(GetMyOrdersHandler.name);

  constructor(private readonly dbContext: PrismaService) {}

  async execute(query: GetMyOrdersQuery): Promise<GetMyOrdersQueryResponse> {
    return await this.getMyOrders(query);
  }

  private async getMyOrders(query: GetMyOrdersQuery): Promise<GetMyOrdersQueryResponse> {
    const { reqUser } = query;

    const orders = await this.dbContext.order.findMany({
      where: { userId: reqUser.id },
      include: {
        room: {
          select: {
            id: true,
            dueTime: true,
            discount: true,
            alias: true,
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
          },
        },
        detail: true,
      },
    });

    return orders.map((order) => ({ ...order, detail: { ...order.detail, price: order.detail.price.toNumber() } }));
  }
}
