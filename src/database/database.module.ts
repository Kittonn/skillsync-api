import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { RedisModule } from './redis/redis.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [MongoModule, RedisModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
