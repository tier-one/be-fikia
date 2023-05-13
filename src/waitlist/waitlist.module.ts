import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitListService } from './waitlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitList } from './entities/waitlist.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([WaitList])],
  controllers: [WaitlistController],
  providers: [WaitListService],
  exports: [WaitListService],
})
export class WaitlistModule {}
