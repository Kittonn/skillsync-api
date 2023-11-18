import { Prisma } from '@prisma/client';

export interface FindAllLayoutsParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.LayoutWhereUniqueInput;
  where?: Prisma.LayoutWhereInput;
  orderBy?: Prisma.LayoutOrderByWithRelationInput;
}

export interface UpdateLayoutParams {
  where: Prisma.LayoutWhereUniqueInput;
  data: Prisma.LayoutUpdateInput;
}
