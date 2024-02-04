import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { Last12MonthsData } from '@/shared/interfaces/analytics.interface';
import { CoursesRepository } from '../courses/courses.repository';
import { OrderRepository } from '../order/order.repository';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly coursesRepository: CoursesRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async getUsersAnalytics(): Promise<Last12MonthsData> {
    return await this.usersRepository.getAnalytics();
  }

  async getCoursesAnalytics(): Promise<Last12MonthsData> {
    return await this.coursesRepository.getAnalytics();
  }

  async getOrderAnalytics(): Promise<Last12MonthsData> {
    return await this.orderRepository.getAnalytics();
  }
}
