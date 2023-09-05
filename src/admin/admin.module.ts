import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UsersModule, MailModule, TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [IsExist, IsNotExist, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
