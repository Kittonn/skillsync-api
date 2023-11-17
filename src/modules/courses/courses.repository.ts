import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}
}
