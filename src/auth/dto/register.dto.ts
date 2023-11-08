import { MinLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}