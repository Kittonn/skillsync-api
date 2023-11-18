import { PartialType } from '@nestjs/swagger';
import { CreateLayoutDto } from './create-layout.dto';

export class UpdateLayoutDto extends PartialType(CreateLayoutDto) {}
