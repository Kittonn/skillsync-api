import { Type } from "@prisma/client";
import { IsEnum } from "class-validator";

export class GetLayoutDto {
  @IsEnum(Type)
  type: Type;
}