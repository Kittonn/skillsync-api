import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailOptions } from '@/shared/interfaces/node-mailer';

@Injectable()
export class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailOptions: EmailOptions): Promise<void> {
    await this.mailerService.sendMail(emailOptions);
  }
}
