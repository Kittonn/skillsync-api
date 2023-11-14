import { Role } from '../enums/role.enum';

export interface JwtPayload {
  sub: string;
  role: Role;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}
