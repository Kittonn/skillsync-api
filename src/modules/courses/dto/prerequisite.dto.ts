import { IsNotEmpty, IsString } from 'class-validator';

export class PrerequisiteDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
