import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import {
  FindAllUsersParams,
  UpdateUserParams,
  UserIncludeFields,
  includeFields,
} from '../../shared/interfaces/user';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(params: FindAllUsersParams): Promise<User[]> {
    return this.prisma.user.findMany({ ...params });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserIncludeFields | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: includeFields,
    });
  }

  async update(params: UpdateUserParams): Promise<User> {
    return this.prisma.user.update({
      ...params,
      include: includeFields,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
