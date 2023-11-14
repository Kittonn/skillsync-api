import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ActivationDto {
  @Length(4, 4)
  @IsNotEmpty()
  @IsString()
  readonly activationCode: string;

  @IsString()
  @IsNotEmpty()
  readonly activationToken: string;
}
