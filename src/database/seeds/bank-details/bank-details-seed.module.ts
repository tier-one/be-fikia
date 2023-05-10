import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { BankDetailsSeedService } from './bank-details-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [BankDetailsSeedService],
  exports: [BankDetailsSeedService],
})
export class UserSeedModule {}
