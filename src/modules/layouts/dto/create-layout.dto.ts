import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CategoryDto } from './category.dto';
import { Transform, plainToClass, Type } from 'class-transformer';
import { FaqDto } from './faq.dto';
import { BannerDto } from './banner.dto';
import { Type as TypeEnum } from '@/shared/enums/type.enum';

export class CreateLayoutDto {
  @IsEnum(TypeEnum)
  @IsNotEmpty()
  readonly type: TypeEnum;

  @IsOptional()
  @Transform(({ value }) => plainToClass(CategoryDto, JSON.parse(value)))
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  readonly categories: CategoryDto[];

  @IsOptional()
  @Transform(({ value }) => plainToClass(FaqDto, JSON.parse(value)))
  @ValidateNested({ each: true })
  @Type(() => FaqDto)
  readonly faq: FaqDto[];

  @IsOptional()
  @Transform(({ value }) => plainToClass(BannerDto, JSON.parse(value)))
  @ValidateNested()
  @Type(() => BannerDto)
  readonly banner: BannerDto;
}
