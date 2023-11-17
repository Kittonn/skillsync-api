import { Prisma } from '@prisma/client';

export interface FindAllCoursesParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.CourseWhereUniqueInput;
  where?: Prisma.CourseWhereInput;
  orderBy?: Prisma.CourseOrderByWithRelationInput;
}

export interface UpdateCourseParams {
  where: Prisma.CourseWhereUniqueInput;
  data: Prisma.CourseUpdateInput;
}
