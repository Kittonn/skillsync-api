import { Controller } from '@nestjs/common';
import { LayoutsService } from './layouts.service';

@Controller('layouts')
export class LayoutsController {
  constructor(private readonly layoutsService: LayoutsService) {}
}
