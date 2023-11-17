import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  readonly oldPassword: string;

  @IsString()
  @MinLength(8)
  readonly newPassword: string;
}
