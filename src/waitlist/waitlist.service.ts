import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WaitList } from './entities/waitlist.entity';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Repository } from 'typeorm';
import { WaitListDto } from './dto/waitlist.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class WaitListService {
  constructor(
    @InjectRepository(WaitList)
    private waitListRepository: Repository<WaitList>,
    private mailService: MailService,
  ) {}

  async createWaitlist(waitListDto: WaitListDto): Promise<WaitList> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    await this.mailService.joinWaitlistMail({
      to: waitListDto.email,
      data: {
        hash,
      },
    });
    return this.waitListRepository.save(
      this.waitListRepository.create(waitListDto),
    );
  }
}
