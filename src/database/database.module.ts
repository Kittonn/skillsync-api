import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RedisModule, CloudinaryModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
