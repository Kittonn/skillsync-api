import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderRepository } from './order.repository';
import { UsersModule } from '../users/users.module';
import { NotificationModule } from '../notification/notification.module';
import { CoursesModule } from '../courses/courses.module';
import { NodeMailerModule } from '../node-mailer/node-mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
    NotificationModule,
    CoursesModule,
    NotificationModule,
    NodeMailerModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
