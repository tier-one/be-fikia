import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Fund } from './entities/fund.entity';
import { FundController, FundInvestorController } from './fund.controller';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { FundBalance } from './entities/FundBalance.entity';
import { FundTransaction } from 'src/fund-transaction/entities/Transation.entity';
import { FundSubscriptionModule } from 'src/fund-subscription/fund-subscription.module';
import { FundSubscriptionService } from 'src/fund-subscription/fund-subscription.service';
import { Subscription } from 'src/fund-subscription/entities/subscription.entity';

@Module({
  imports: [
    UsersModule,
    FundSubscriptionModule,
    TypeOrmModule.forFeature([
      Fund,
      User,
      Subscription,
      FundBalance,
      FundTransaction,
    ]),
  ],
  controllers: [FundController, FundInvestorController],
  providers: [IsExist, IsNotExist, FundService, FundSubscriptionService],
  exports: [FundService, FundSubscriptionService],
})
export class FundModule {}
