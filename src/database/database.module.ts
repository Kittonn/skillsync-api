import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MongoDBModule } from './mongo/mongo.module';

@Module({
  imports: [RedisModule, CloudinaryModule, MongoDBModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
