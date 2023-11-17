import { Benefit, Level, Prerequisite, CourseDetail } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

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

  @IsString()
  @IsNotEmpty()
  readonly demoUrl: string;

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  readonly benefits: Benefit[];

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  readonly prerequisites: Prerequisite[];

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  readonly courseDetails: CourseDetail[];
}
