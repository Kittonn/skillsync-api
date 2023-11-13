import { IsString, IsNotEmpty } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
