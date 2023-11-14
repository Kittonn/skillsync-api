import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@/database/prisma/prisma.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
