import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, subject: string, text: string) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      text,
    });
  }
}
