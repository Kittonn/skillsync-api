import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './schema/notification.schema';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/shared/enums/role.enum';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async getNotifications(): Promise<Notification[]> {
    return await this.notificationService.getNotifications();
  }

  @Put('/:notificationId')
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async updateNotification(
    @Param('notificationId') notificationId: string,
  ): Promise<Notification> {
    return await this.notificationService.updateNotification(notificationId);
  }
}
