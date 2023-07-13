import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import * as crypto from 'crypto';
import { Status } from 'src/statuses/entities/status.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { Injectable } from '@nestjs/common';
import { CreateFundManagerDto } from './dto/create-fund-manager.dto';

@Injectable()
export class FundManagerService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async register(dto: CreateFundManagerDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    try {
      await this.usersService.create({
        ...dto,
        email: dto.email,
        role: {
          id: RoleEnum.manager,
        } as Role,
        status: {
          id: StatusEnum.inactive,
        } as Status,
        hash,
      });

      try {
        await this.mailService.userSignUp({
          to: dto.email,
          data: {
            hash,
          },
        });
      } catch (error) {
        if (error.code === 'EAUTH') {
          throw new Error(
            'Email service credentials are not properly configured.',
          );
        } else {
          throw new Error('Failed to send the confirmation email.');
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
