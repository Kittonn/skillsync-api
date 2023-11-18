import { IsNotEmpty, IsString } from 'class-validator';

export class FaqDto {
  @IsString()
  @IsNotEmpty()
  readonly question: string;

  @IsString()
  @IsNotEmpty()
  readonly answer: string;
}
