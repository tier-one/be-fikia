import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@ApiBearerAuth()
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
  @Get('view-profile/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.admin, RoleEnum.manager, RoleEnum.user)
  findOne(@Param('id') id: string): Promise<NullableType<User>> {
    return this.usersActivityService.findOne({ id });
  }

  @SerializeOptions({
    groups: ['admin', 'manager', 'user'],
  })
  @Patch('update-profile/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.admin, RoleEnum.manager, RoleEnum.user)
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersActivityService.update(id, updateProfileDto);
  }

  @Get('view-activities/:id')
  @Roles(RoleEnum.admin)
  getUserActivities(@Param('Id') userId: string) {
    return this.usersActivityService.getUserActivities(userId);
  }
}
