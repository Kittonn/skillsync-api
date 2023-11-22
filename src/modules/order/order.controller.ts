import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser('_id') userId: string,
  ) {
    return this.orderService.createOrder(userId, createOrderDto);
  }
}
