import { Module } from '@nestjs/common';
import { LayoutsService } from './layouts.service';
import { LayoutsController } from './layouts.controller';
import { CloudinaryModule } from '@/database/cloudinary/cloudinary.module';
import { LayoutsRepository } from './layouts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Layout, LayoutSchema } from './schema/layout.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: Layout.name, schema: LayoutSchema }]),
  ],
  controllers: [LayoutsController],
  providers: [LayoutsService, LayoutsRepository],
})
export class LayoutsModule {}
