import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { Notification } from './schema/notification.schema';
import { NotificationStatus } from '@/shared/enums/notification-status.enum';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(): Promise<Notification[]> {
    return this.notificationRepository.find({}, { sort: { createdAt: -1 } });
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
}
