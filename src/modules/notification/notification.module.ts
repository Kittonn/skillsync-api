import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schema/notification.schema';

@Module({
  controllers: [
    NotificationController,
    // MongooseModule.forFeature([
    //   { name: 'Notification', schema: NotificationSchema },
    // ]),
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
