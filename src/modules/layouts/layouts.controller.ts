import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LayoutsService } from './layouts.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@/common/pipes/file-validation.pipe';
import { Layout, Role, Type } from '@prisma/client';
import { GetLayoutDto } from './dto/get-layout.dto';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('layouts')
export class LayoutsController {
  constructor(private readonly layoutsService: LayoutsService) {}

  @Get()
  find(@Body() getLayoutDto: GetLayoutDto) {
    return this.layoutsService.getLayoutByType(getLayoutDto);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
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
  ): Promise<Layout> {
    return this.layoutsService.createLayout(file, createLayoutDto);
  }

  @Put()
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
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
  ): Promise<Layout> {
    return this.layoutsService.updateLayout(file, updateLayoutDto);
  }
}
