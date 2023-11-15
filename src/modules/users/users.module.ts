import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@/database/prisma/prisma.service';
import { UsersRepository } from './users.repository';
import { RedisModule } from '@/database/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
