import { IsNotEmpty, IsString } from 'class-validator';

export class BannerDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly subtitle: string;
}
