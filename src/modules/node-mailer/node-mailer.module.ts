import { Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('mailer.host'),
          port: configService.get('mailer.port'),
          secure: false,
          auth: {
            user: configService.get('mailer.user'),
            pass: configService.get('mailer.pass'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('mailer.user')}>`,
        },
        template: {
          dir: path.join(__dirname, '../../templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [NodeMailerService],
  exports: [NodeMailerService],
})
export class NodeMailerModule {}
