import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialSignInDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
