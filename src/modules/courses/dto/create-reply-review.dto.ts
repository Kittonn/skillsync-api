import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyReviewDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly reviewId: string;

  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
