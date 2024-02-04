import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { Notification } from './schema/notification.schema';
import { NotificationStatus } from '@/shared/enums/notification-status.enum';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(): Promise<Notification[]> {
    return await this.notificationRepository.find(
      {},
      { sort: { createdAt: -1 } },
    );
  }

  async updateNotification(notificationId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      _id: notificationId,
    });

    if (!notification) {
      throw new NotFoundException();
    }

    notification.status = NotificationStatus.READ;

    await notification.save();

    return notification;
  }

  @Cron('0 0 0 * * *')
  async deleteNotification() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await this.notificationRepository.deleteMany({
      status: NotificationStatus.READ,
      createdAt: { $lt: thirtyDaysAgo },
    });
  }
}
