import { FileValidationOptions } from '@/shared/interfaces/file.interface';
import {
  ArgumentMetadata,
  BadRequestException,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly options: FileValidationOptions) {}

  transform(
    file: Express.Multer.File,
    metadate: ArgumentMetadata,
  ): Express.Multer.File {
    if (file) {
      this.validateFileSize(file);
      this.validateFileType(file);
      return file;
    } else {
      return null;
    }
  }

  private validateFileSize(file: Express.Multer.File): void {
    const maxFileSizeValidator = new MaxFileSizeValidator({
      maxSize: this.options.maxSize,
    });

    const isValid = maxFileSizeValidator.isValid(file);
    if (!isValid) {
      throw new BadRequestException('File size is too large');
    }
  }

  private validateFileType(file: Express.Multer.File): void {
    const fileTypeValidator = new FileTypeValidator({
      fileType: this.options.fileType,
    });

    const isValid = fileTypeValidator.isValid(file);
    if (!isValid) {
      throw new BadRequestException('File type is not supported');
    }
  }
}
