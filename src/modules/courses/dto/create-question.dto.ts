import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly question: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly contentId: string;
}
