import { RoleEnum } from 'src/roles/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class UpdateUserRoleDto {
  @ApiProperty({ enum: RoleEnum, example: RoleEnum.manager })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  roleId: number;
}
