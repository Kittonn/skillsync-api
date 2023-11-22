import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
  controllers: [
    OrderController,
    // MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrderService],
})
export class OrderModule {}
