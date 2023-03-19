import {
  IsOptional,
  IsString,
  IsDateString,
  MinLength,
  IsEmail,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly firstname?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lastname?: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @MinLength(10, {
    message: 'Contact should be atleast 10 digits',
  })
  @ApiPropertyOptional()
  readonly contact?: string;
}
