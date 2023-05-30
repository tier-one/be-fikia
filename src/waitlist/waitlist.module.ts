import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitListService } from './waitlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitList } from './entities/waitlist.entity';
import { MailModule } from 'src/mail/mail.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([WaitList])],
  controllers: [WaitlistController],
  providers: [IsExist, IsNotExist, WaitListService],
  exports: [WaitListService],
})
export class WaitlistModule {}
