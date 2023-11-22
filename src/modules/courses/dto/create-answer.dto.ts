import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly contentId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly questionId: string;

  @IsString()
  @IsNotEmpty()
  readonly answer: string;
}
