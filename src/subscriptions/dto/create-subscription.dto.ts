import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly price!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description!: string;

  @IsNumber()
  @IsOptional()
  // @ApiPropertyOptional()
  user?: User;
}
