import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivityController } from './user-activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [IsExist, IsNotExist, UserActivityService],
  controllers: [UserActivityController],
})
export class UserActivityModule {}
