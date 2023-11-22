import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { Order } from './schema/order.schema';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/shared/enums/role.enum';

@Controller('order')
@UseGuards(AccessTokenGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser('_id') userId: string,
  ): Promise<Order> {
    return this.orderService.createOrder(userId, createOrderDto);
  }
}
