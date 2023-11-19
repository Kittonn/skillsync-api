import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { LayoutsRepository } from './layouts.repository';
import { Layout, Type } from '@prisma/client';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { GetLayoutDto } from './dto/get-layout.dto';

@Injectable()
export class LayoutsService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly layoutsRepository: LayoutsRepository,
  ) {}

  async getLayoutByType(getLayoutDto: GetLayoutDto): Promise<Layout> {
    const layout = await this.layoutsRepository.findOne({
      type: getLayoutDto.type,
    });

    if (!layout) {
      throw new NotFoundException();
    }

    return layout;
  }

  async createLayout(
    file: Express.Multer.File,
    createLayoutDto: CreateLayoutDto,
  ): Promise<Layout> {
    const existingLayout = await this.layoutsRepository.findOne({
      type: createLayoutDto.type,
    });

    if (existingLayout) {
      throw new ConflictException();
    }

    let uploadedFile;

    if (
      createLayoutDto.type === Type.BANNER &&
      (!file || !createLayoutDto.banner)
    ) {
      throw new BadRequestException();
    } else if (
      createLayoutDto.type === Type.CATEGORY &&
      !createLayoutDto.categories
    ) {
      throw new BadRequestException();
    } else if (createLayoutDto.type === Type.FAQ && !createLayoutDto.faq) {
      throw new BadRequestException();
    }

    if (createLayoutDto.type === Type.BANNER && file) {
      uploadedFile = await this.cloudinaryService.uploadFile(file);
    }

    const createdLayout = await this.layoutsRepository.create({
      ...createLayoutDto,
      ...(createLayoutDto.banner &&
        uploadedFile && {
          banner: {
            ...createLayoutDto.banner,
            image: {
              publicId: uploadedFile.public_id,
              url: uploadedFile.secure_url,
            },
          },
        }),
    });

    return createdLayout;
  }

  async updateLayout(
    file: Express.Multer.File,
    updateLayoutDto: UpdateLayoutDto,
  ): Promise<Layout> {
    const existingType = await this.layoutsRepository.findOne({
      type: updateLayoutDto.type,
    });

    if (!existingType) {
      throw new NotFoundException();
    }

    if (
      updateLayoutDto.type === Type.BANNER &&
      (!file || !updateLayoutDto.banner)
    ) {
      throw new BadRequestException();
    } else if (
      updateLayoutDto.type === Type.CATEGORY &&
      !updateLayoutDto.categories
    ) {
      throw new BadRequestException();
    } else if (updateLayoutDto.type === Type.FAQ && !updateLayoutDto.faq) {
      throw new BadRequestException();
    }

    let uploadedFile;
    if (updateLayoutDto.type === Type.BANNER && file) {
      await this.cloudinaryService.deleteFile(
        existingType.banner.image.publicId,
      );
      uploadedFile = await this.cloudinaryService.uploadFile(file);
    }

    const updatedLayout = await this.layoutsRepository.update({
      where: {
        id: existingType.id,
      },
      data: {
        ...updateLayoutDto,
        ...(updateLayoutDto.banner &&
          uploadedFile && {
            banner: {
              ...updateLayoutDto.banner,
              image: {
                publicId: uploadedFile.public_id,
                url: uploadedFile.secure_url,
              },
            },
          }),
      },
    });

    return updatedLayout;
  }
}
