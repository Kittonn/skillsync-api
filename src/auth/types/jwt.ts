import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  role: Role;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}
