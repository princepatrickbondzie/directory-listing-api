import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Roles } from 'src/common/dto/app.enums';

export class AuthCredentialDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly firstname!: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly lastname!: string;

  @IsOptional()
  @IsIn([
    Roles.User,
    Roles.Admin,
    Roles.Account,
    Roles.Marketing,
    Roles.SuperAdmin,
    Roles.CustomerSupport,
  ])
  @ApiPropertyOptional({
    enum: [
      Roles.User,
      Roles.Admin,
      Roles.Account,
      Roles.Marketing,
      Roles.SuperAdmin,
      Roles.CustomerSupport,
    ],
  })
  readonly role?: Roles;

  @IsString()
  @ApiProperty()
  readonly contact!: string;
}
