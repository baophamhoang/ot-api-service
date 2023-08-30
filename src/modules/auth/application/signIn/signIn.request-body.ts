import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequestBody {
  @ApiProperty({
    description: 'returned code from Openid or OAuth',
    example: '2697222791.5824177725556.bee105f28c4fa79887862f4c1135a238073bcdb9ab667b58805611f1f41bd376',
  })
  @IsNotEmpty()
  @IsString()
  code: string;
}
