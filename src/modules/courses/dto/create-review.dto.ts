import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
