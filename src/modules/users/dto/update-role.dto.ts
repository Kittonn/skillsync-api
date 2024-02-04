import { Role } from '@/shared/enums/role.enum';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
