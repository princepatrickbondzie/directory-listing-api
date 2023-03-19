import { IsEmail, IsNotEmpty } from 'class-validator';

export class ToggleUserActivationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
