import { Module } from '@nestjs/common';
import { FundTransactionService } from './fund-transaction.service';
import { FundTransactionController } from './fund-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundTransaction } from './entities/Transation.entity';
import { User } from 'src/users/entities/user.entity';
import { Fund } from 'src/fund/entities/fund.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundTransaction, Fund, User])],
  providers: [FundTransactionService],
  exports: [FundTransactionService],
  controllers: [FundTransactionController],
})
export class FundTransactionModule {}
