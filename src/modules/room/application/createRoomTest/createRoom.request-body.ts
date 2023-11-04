import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import dayjs from 'dayjs';

export class CreateRoomRequestBody {
  @ApiProperty({
    description: 'Scraping URL',
    example: 'https://food.grab.com/vn/vi/restaurant/ti%E1%BB%87m-%C4%83n-doo-doo-delivery/5-C35ELUJKTT2CAT',
  })
  @IsNotEmpty()
  @IsUrl()
  scrapingUrl: string;

  @ApiProperty()
  @Transform(({ value }) => dayjs(value).toDate())
  dueTime: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  alias?: string;
}
