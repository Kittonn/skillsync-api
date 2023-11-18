import { Module } from '@nestjs/common';
import { LayoutsService } from './layouts.service';
import { LayoutsController } from './layouts.controller';
import { CloudinaryModule } from '@/database/cloudinary/cloudinary.module';
import { PrismaModule } from '@/database/prisma/prisma.module';
import { LayoutsRepository } from './layouts.repository';

@Module({
  imports: [CloudinaryModule, PrismaModule],
  controllers: [LayoutsController],
  providers: [LayoutsService, LayoutsRepository],
})
export class LayoutsModule {}
