import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { FindAllUsersParams, UpdateUserParams } from '../../shared/interfaces/user';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Promise<Omit<User, Key>> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<User, Key>;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(params: FindAllUsersParams): Promise<User[]> {
    return this.prisma.user.findMany({ ...params });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(params: UpdateUserParams): Promise<User> {
    return this.prisma.user.update({ ...params });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
