import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LayoutsService } from './layouts.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@/common/pipes/file-validation.pipe';

@Controller('layouts')
export class LayoutsController {
  constructor(private readonly layoutsService: LayoutsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 10 * 1024 * 1024,
        fileType: /^image\/(png|jpeg|jpg|webp)$/,
      }),
    )
    file: Express.Multer.File,
    @Body() createLayoutDto: CreateLayoutDto,
  ) {
    return this.layoutsService.createLayout(file, createLayoutDto);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  update(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 10 * 1024 * 1024,
        fileType: /^image\/(png|jpeg|jpg|webp)$/,
      }),
    )
    file: Express.Multer.File,
    @Body() updateLayoutDto: CreateLayoutDto,
  ) {
    return this.layoutsService.updateLayout(file, updateLayoutDto);
  }
}
