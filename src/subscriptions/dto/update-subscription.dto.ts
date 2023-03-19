import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateSubscriptionDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  readonly price?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description?: string;
}
