import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Last12MonthsData } from '@/shared/interfaces/analytics.interface';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('users')
  async getUsersAnalytics(): Promise<Last12MonthsData> {
    return await this.analyticsService.getUsersAnalytics();
  }

  @Get('courses')
  async getCoursesAnalytics(): Promise<Last12MonthsData> {
    return await this.analyticsService.getCoursesAnalytics();
  }

  @Get('order')
  async getOrderAnalytics(): Promise<Last12MonthsData> {
    return await this.analyticsService.getOrderAnalytics();
  }
}
