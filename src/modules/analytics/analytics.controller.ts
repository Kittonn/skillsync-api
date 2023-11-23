import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/shared/enums/role.enum';
import { Last12MonthsData } from '@/shared/interfaces/analytics.interface';

@Controller('analytics')
// @Roles(Role.ADMIN)
// @UseGuards(AccessTokenGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('users')
  async getUsersAnalytics(): Promise<Last12MonthsData> {
    return this.analyticsService.getUsersAnalytics();
  }

  @Get('courses')
  async getCoursesAnalytics(): Promise<Last12MonthsData> {
    return this.analyticsService.getCoursesAnalytics();
  }

  @Get('order')
  async getOrderAnalytics(): Promise<Last12MonthsData> {
    return this.analyticsService.getOrderAnalytics();
  }
}
