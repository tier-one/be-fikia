import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { AssetController } from './asset.controller';
import { Asset } from './entities/Asset.entity';
import { Fund } from 'src/fund/entities/fund.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { FundValue } from 'src/fund/entities/FundValue.entity';
import { AssetBalance } from './entities/AssetBalance.entity';
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Asset, Fund, User, FundValue, AssetBalance]),
  ],
  controllers: [AssetController],
  providers: [IsExist, IsNotExist, AssetService],
  exports: [AssetService],
})
export class AssetModule {}
