import { Module } from '@nestjs/common';
import { FundTransactionService } from './fund-transaction.service';
import { FundTransactionController } from './fund-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundTransaction } from './entities/Transation.entity';
import { Asset } from 'src/fund-asset/entities/Asset.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundTransaction, Asset, User])],
  providers: [FundTransactionService],
  exports: [FundTransactionService],
  controllers: [FundTransactionController],
})
export class FundTransactionModule {}
