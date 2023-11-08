import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { EmailOptions } from '@/shared/types/email';

@Injectable()
export class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailOptions: EmailOptions): Promise<void> {
    await this.mailerService.sendMail(emailOptions);
  }
}
