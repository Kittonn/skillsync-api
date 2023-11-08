import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { EmailOptions } from '@/shared/types/email';

@Injectable()
export class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailOptions: EmailOptions): Promise<void> {
    console.log(__dirname)
    await this.mailerService.sendMail({
      to: emailOptions.to,
      subject: emailOptions.subject,
      // template: path.join(__dirname, './templates', emailOptions.template),
      template: emailOptions.template,
      context: emailOptions.context,
    });
  }
}
