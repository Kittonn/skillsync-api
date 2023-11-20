import { Prisma } from '@prisma/client';
import { Thumbnail } from './course.interface';

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

export interface Faq {
  question: string;
  answer: string;
}

export interface Category {
  title: string;
}

