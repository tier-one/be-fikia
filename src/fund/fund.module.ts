import { Module } from '@nestjs/common';
import { FundService } from './fund.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Fund } from './entities/fund.entity';
import { FundController } from './fund.controller';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { FundBalance } from './entities/FundBalance.entity';
import { FundTransaction } from 'src/fund-transaction/entities/Transation.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Fund, User, FundBalance, FundTransaction]),
  ],
  controllers: [FundController],
  providers: [IsExist, IsNotExist, FundService],
  exports: [FundService],
})
export class FundModule {}
