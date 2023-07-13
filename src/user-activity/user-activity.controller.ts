import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from 'src/users/entities/user.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserActivityService } from './user-activity.service';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.manager, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users Activity')
@Controller({
  path: 'user-activity',
  version: '1',
})
export class UserActivityController {
  constructor(private readonly usersActivityService: UserActivityService) {}

  @SerializeOptions({
    groups: ['admin', 'user', 'manager'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<User>> {
    return this.usersActivityService.findOne({ id });
  }
}
