import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@/users/schema/user.schema';
import * as path from 'path';

@Injectable()
export class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationCode(email: string, activationCode: string, user: User) {
    const templatePath = path.join(
      __dirname,
      './templates/activation-mail.ejs',
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Activation code',
      template: templatePath,
      context: {
        activationCode,
        user,
      },
    });
  }
}
