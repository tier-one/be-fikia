import { Module } from '@nestjs/common';
import { FundManagerService } from './fund-manager.service';
import { FundManagerController } from './fund-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UsersModule, MailModule, TypeOrmModule.forFeature([User])],
  controllers: [FundManagerController],
  providers: [IsExist, IsNotExist, FundManagerService],
  exports: [FundManagerService],
})
export class FundManagerModule {}
