import { Module } from '@nestjs/common';
import { FundManagerService } from './fund-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { FundManagerController } from './fund-manager.controller';
import { Fund } from './entities/fund.entity';
import { AssetTable } from './entities/Asset.entity';
import { TransactionTable } from './entities/Transaction.entity';
import { Order } from './entities/Order.entity';
import { KYCResult } from 'src/kyc-verification/Entities/KYCResult.entity';
import { Balance } from './entities/Balance.entity';
import { Subscription } from './entities/Subscription.entity';
import { FundSetup } from './entities/fund-setup.entity';
import { FundValue } from './entities/FundValue.entity';

@Module({
  imports: [
    UsersModule,
    MailModule,
    TypeOrmModule.forFeature([
      User,
      Fund,
      AssetTable,
      TransactionTable,
      Order,
      KYCResult,
      Balance,
      Subscription,
      FundSetup,
      FundValue,
    ]),
  ],
  controllers: [FundManagerController],
  providers: [IsExist, IsNotExist, FundManagerService],
  exports: [FundManagerService],
})
export class FundManagerModule {}
