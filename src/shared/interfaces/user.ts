import { Prisma } from '@prisma/client';

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

export const includeFields = {
  avatar: true,
} satisfies Prisma.UserInclude;

export type UserIncludeFields = Prisma.UserGetPayload<{
  include: typeof includeFields;
}>;
