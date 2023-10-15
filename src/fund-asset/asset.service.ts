import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Fund } from 'src/fund/entities/fund.entity';
import { FundValue } from 'src/fund/entities/FundValue.entity';
import { Asset } from './entities/Asset.entity';
import { AssetBalance } from './entities/AssetBalance.entity';
import {
  FundNotFoundException,
  InvestorNotFoundException,
} from '../middlewares/fund.exceptions';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Fund)
    private readonly fundRepository: Repository<Fund>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    @InjectRepository(FundValue)
    private fundValueRepository: Repository<FundValue>,

    @InjectRepository(AssetBalance)
    private assetBalanceRepository: Repository<AssetBalance>,
    private readonly manager: EntityManager,
  ) {}

  async createAsset(
    fundId: string,
    investorId: string,
    createAssetDto: CreateAssetDto,
  ): Promise<Asset> {
    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });
    const fund = await this.fundRepository.findOne({ where: { id: fundId } });

    if (!fund) {
      throw new FundNotFoundException(fundId);
    }
    if (!investor) {
      throw new InvestorNotFoundException(investorId);
    }

    const assetData = this.assetRepository.create({
      ...createAssetDto,
      fundId: fund,
      value: createAssetDto.value || createAssetDto.price,
    });

    const savedAsset = await this.manager.transaction(
      async (transactionalEntityManager) => {
        const asset = await transactionalEntityManager.save(assetData);

        const fundValue = this.fundValueRepository.create({
          fundId: fund,
          value: asset.value,
        });

        await transactionalEntityManager.save(fundValue);

        const balanceData = {
          investorId: asset.investorId,
          fundBalance: createAssetDto.price,
          assetBalance: createAssetDto.price || 0,
        };

        const existingBalance = await this.assetBalanceRepository.findOne({
          where: {
            investorId: { id: balanceData.investorId.id },
          },
        });

        if (existingBalance) {
          balanceData.fundBalance =
            Number(balanceData.fundBalance) +
            Number(existingBalance.investorFundBalance);
          balanceData.assetBalance =
            Number(balanceData.assetBalance) +
            Number(existingBalance.investorAssetBalance);
        } else {
          balanceData.assetBalance =
            balanceData.assetBalance || createAssetDto.price;
        }

        const balance = this.assetBalanceRepository.create(balanceData);
        await transactionalEntityManager.save(balance);

        return asset;
      },
    );

    return savedAsset;
  }

  async getAsset(assetId: string): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return asset;
  }
  async getAllAsset(): Promise<Asset[]> {
    const asset = await this.assetRepository.find();

    if (!asset.length) {
      throw new NotFoundException('No asset setup found');
    }

    return asset;
  }
}
