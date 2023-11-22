import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { User } from '../users/schema/user.schema';
import { UsersRepository } from '../users/users.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotificationRepository } from '../notification/notification.repository';
import { CoursesRepository } from '../courses/courses.repository';
import { NodeMailerService } from '../node-mailer/node-mailer.service';
import { Order } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly usersRepository: UsersRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly coursesRepository: CoursesRepository,
    private readonly nodeMailerService: NodeMailerService,
  ) {}

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const user = await this.usersRepository.findOne({ _id: userId });

    const courseExist = user.courses.find(
      (course) => course.toString() === createOrderDto.courseId,
    );

    if (courseExist) {
      throw new ConflictException('User already has this course');
    }

    const course = await this.coursesRepository.findOne({
      _id: createOrderDto.courseId,
    });

    if (!course) {
      throw new NotFoundException();
    }

    const createdOrder = await this.orderRepository.create({
      course: createOrderDto.courseId,
      user: userId,
    });

    user.courses.push(course._id);
    await user.save();

    await this.notificationRepository.create({
      user: user._id,
      message: `You have a new order for your course ${course.name}`,
      title: 'New Order',
    });

    console.log();

    await this.nodeMailerService.sendEmail({
      context: {
        user: {
          name: user.name,
        },
        order: {
          orderId: createdOrder._id.toString().slice(-6),
          totalAmount: course.price,
          courseName: course.name,
        },
      },
      to: user.email,
      subject: 'Confirm your order',
      template: 'confirm-order',
    });

    return createdOrder;
  }
}
