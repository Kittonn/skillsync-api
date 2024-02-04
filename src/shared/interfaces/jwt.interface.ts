import { Role } from '../enums/role.enum';

export interface JwtPayload {
  sub: string;
  role: Role;
}
