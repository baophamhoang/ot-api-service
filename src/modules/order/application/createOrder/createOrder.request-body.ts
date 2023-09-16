//import {  CreateOrderDto } from '@modules/order/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';

export class OrderDishBody {
  @ApiProperty({
    description: 'Dish Id',
    example: 'VNITE20230216073030148566',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Dish quantity',
    example: 3,
  })
  @IsNumber()
  quantity: number;
}

export class CreateOrderRequestBody {
  @ApiProperty({
    description: 'Dish Id',
    example: '244fa7e4-81a3-4c11-b428-1d07d7786071',
  })
  @IsUUID(4)
  roomId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderDishBody)
  dishes: OrderDishBody[];
}
