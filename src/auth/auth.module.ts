import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { NodeMailerModule } from '@/node-mailer/node-mailer.module';
import { RedisModule } from '@/database/redis/redis.module';

@Module({
  imports: [UsersModule, JwtModule, NodeMailerModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
