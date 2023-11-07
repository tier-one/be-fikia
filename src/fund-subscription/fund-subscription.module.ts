import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { FundSubscriptionService } from './fund-subscription.service';
import { FundSubscriptionController } from './fund-subscription.controller';
import { User } from 'src/users/entities/user.entity';
import { Fund } from 'src/fund/entities/fund.entity';
import { Asset } from 'src/fund-asset/entities/Asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User, Fund, Asset])],
  providers: [FundSubscriptionService],
  controllers: [FundSubscriptionController],
})
export class FundSubscriptionModule {}
