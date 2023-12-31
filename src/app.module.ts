import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from '@/modules/users/users.module';
import { CoursesModule } from '@/modules/courses/courses.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { NodeMailerModule } from '@/modules/node-mailer/node-mailer.module';
import { LayoutsModule } from './modules/layouts/layouts.module';
import { OrderModule } from './modules/order/order.module';
import { NotificationModule } from './modules/notification/notification.module';
import configuration from '@/config/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    CoursesModule,
    AuthModule,
    NodeMailerModule,
    LayoutsModule,
    OrderModule,
    NotificationModule,
    ScheduleModule.forRoot(),
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
