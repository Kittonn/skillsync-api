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

export interface CourseDetail {
  videoUrl: string;
  title: string;
  videoSection: string;
  desciption: string;
  videoLength: number;
  videoPlayer: string;
  links: Link[];
  suggestion: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface Prerequisite {
  title: string;
}

export interface Benefit extends Prerequisite {}

export interface Thumbnail {
  url: string;
  publicId: string;
}
