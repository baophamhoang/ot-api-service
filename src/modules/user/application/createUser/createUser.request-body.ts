import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserBody {
  @ApiProperty({
    description: 'First name of user',
    example: 'Nguyen',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of user',
    example: 'Tran',
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'Middle name of user',
    example: 'Hung Phuc',
  })
  middleName?: string;

  @ApiProperty({
    description: 'Username of user',
    example: 'nguyen_tran',
  })
  username: string;

  @ApiProperty({
    description: 'Email of user',
    example: 'example@mail.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Avatar url of user',
    example: 'https://storage.dev/avatar.png',
  })
  avatarUrl?: string;

  @ApiProperty({
    description: 'Avatar url of user',
    //TODO: Update this role by UserRole enum
    example: ['USER', 'ADMIN'],
  })
  roles: string[];
}
