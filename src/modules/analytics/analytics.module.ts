import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { UsersModule } from '../users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [UsersModule, CoursesModule, OrderModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
