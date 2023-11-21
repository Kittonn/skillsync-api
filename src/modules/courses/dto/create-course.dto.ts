import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToClass } from 'class-transformer';
import { PrerequisiteDto } from './prerequisite.dto';
import { CourseDetailDto } from './course-detail.dto';
import { BenefitDto } from './benefit.dto';
import { Level } from '@/shared/enums/level.enum';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  readonly price: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  readonly estimatedPrice: number;

  @IsString()
  @IsNotEmpty()
  readonly tags: string;

  @IsEnum(Level)
  @IsNotEmpty()
  readonly level: Level;

  @IsUrl()
  @IsNotEmpty()
  readonly demoUrl: string;

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => plainToClass(BenefitDto, JSON.parse(value)))
  @ValidateNested({ each: true })
  @Type(() => BenefitDto)
  readonly benefits: BenefitDto[];

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => plainToClass(PrerequisiteDto, JSON.parse(value)))
  @ValidateNested({ each: true })
  @Type(() => PrerequisiteDto)
  readonly prerequisites: PrerequisiteDto[];

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => plainToClass(CourseDetailDto, JSON.parse(value)))
  @ValidateNested({ each: true })
  @Type(() => CourseDetailDto)
  readonly courseDetails: CourseDetailDto[];
}
