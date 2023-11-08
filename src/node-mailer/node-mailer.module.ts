import { Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

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
        }
      }),
    }),
  ],
  controllers: [],
  providers: [NodeMailerService],
})
export class NodeMailerModule {}
