import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetRoomRequestQuery {
  @ApiProperty({
    description: 'Room Id',
    example: '965fa9a5-4505-46b1-8002-215ee87c01d4',
  })
  @IsUUID(4)
  id: string;
}
