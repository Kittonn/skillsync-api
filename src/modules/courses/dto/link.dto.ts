import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class LinkDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsUrl()
  @IsNotEmpty()
  readonly url: string;
}
