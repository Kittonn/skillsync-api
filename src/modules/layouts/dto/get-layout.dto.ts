import { Type } from '@/shared/enums/type.enum';
import { IsEnum } from 'class-validator';

export class GetLayoutDto {
  @IsEnum(Type)
  type: Type;
}
