import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestUpdatePassword {
  @IsEmail()
  @ApiProperty()
  email: string;
}
