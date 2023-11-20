import { Prisma, User } from '@prisma/client';

export interface FindAllUsersParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}

export interface UpdateUserParams {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}

export type UserWithCourseIds = User & { courseIds: string[] };

export interface Avatar {
  url: string;
  publicId: string;
}