import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { NodeMailerModule } from '@/node-mailer/node-mailer.module';


@Module({
  imports: [UsersModule, JwtModule, NodeMailerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
