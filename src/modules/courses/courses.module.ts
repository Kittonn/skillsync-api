import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { PrismaModule } from '@/database/prisma/prisma.module';
import { RedisModule } from '@/database/redis/redis.module';
import { CloudinaryModule } from '@/database/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, RedisModule, CloudinaryModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
