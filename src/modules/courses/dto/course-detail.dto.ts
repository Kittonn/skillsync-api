import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { LinkDto } from './link.dto';

export class CourseDetailDto {
  @IsUrl()
  @IsNotEmpty()
  readonly videoUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly videoSection: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  readonly videoLength: number;

  @IsString()
  @IsNotEmpty()
  readonly videoPlayer: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  readonly links: LinkDto[];

  @IsString()
  @IsNotEmpty()
  readonly suggestion: string;
}
