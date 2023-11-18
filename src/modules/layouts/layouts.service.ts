import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { LayoutsRepository } from './layouts.repository';
import { Type } from '@prisma/client';

@Injectable()
export class LayoutsService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly layoutsRepository: LayoutsRepository,
  ) {}

  async createLayout(
    file: Express.Multer.File,
    createLayoutDto: CreateLayoutDto,
  ) {
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
}
