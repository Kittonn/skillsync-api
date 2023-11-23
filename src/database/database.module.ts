import { Module } from '@nestjs/common';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MongoDBModule } from './mongo/mongo.module';

@Module({
  imports: [CloudinaryModule, MongoDBModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
