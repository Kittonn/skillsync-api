import { PrismaService } from '@/database/prisma/prisma.service';
import {
  FindAllLayoutsParams,
  UpdateLayoutParams,
} from '@/shared/interfaces/layout';
import { Injectable } from '@nestjs/common';
import { Layout, Prisma } from '@prisma/client';

@Injectable()
export class LayoutsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.LayoutCreateInput): Promise<Layout> {
    return this.prismaService.layout.create({ data });
  }

  async findAll(params: FindAllLayoutsParams): Promise<Layout[]> {
    return this.prismaService.layout.findMany({ ...params });
  }

  async findOne(
    userWhereUniqueInput: Prisma.LayoutWhereUniqueInput,
  ): Promise<Layout | null> {
    return this.prismaService.layout.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(params: UpdateLayoutParams): Promise<Layout> {
    return this.prismaService.layout.update({ ...params });
  }

  async delete(where: Prisma.LayoutWhereUniqueInput): Promise<Layout> {
    return this.prismaService.layout.delete({ where });
  }
}
