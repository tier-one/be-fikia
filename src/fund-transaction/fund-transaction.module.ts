import { Module } from '@nestjs/common';
import { FundTransactionService } from './fund-transaction.service';
import { FundTransactionController } from './fund-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundTransaction } from './entities/Transation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundTransaction])],
  providers: [FundTransactionService],
  exports: [FundTransactionService],
  controllers: [FundTransactionController],
})
export class FundTransactionModule {}
