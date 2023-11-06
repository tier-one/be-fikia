import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Asset } from './entities/Asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import {
  AssetNotFoundException,
  FundNotFoundException,
  InvestorNotFoundException,
} from 'src/middlewares/fund.exceptions';
import { Fund } from 'src/fund/entities/fund.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Fund)
    private fundRepository: Repository<Fund>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAsset(
    investorId: string,
    createAssetDto: CreateAssetDto,
    fundId: string,
  ): Promise<Asset> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new FundNotFoundException(fundId);
    }

    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });

    if (!investor) {
      throw new InvestorNotFoundException(investorId);
    }

    const isFirstAsset =
      (await this.assetRepository.count({
        where: { investorId: Equal(investor.id) },
      })) === 0;

    let assetBalance: number;

    if (isFirstAsset) {
      assetBalance = createAssetDto.price;
    } else {
      const lastAsset = await this.assetRepository.findOne({
        where: { investorId: Equal(investor.id) },
        order: { createdAt: 'DESC' },
      });

      if (lastAsset) {
        assetBalance = lastAsset.assetBalance + createAssetDto.price;
      } else {
        assetBalance = createAssetDto.price;
      }
    }

    const asset = this.assetRepository.create({
      ...createAssetDto,
      fundId: fund,
      investorId: investor,
      assetBalance,
    });

    // Save the asset to the database and return it
    return this.assetRepository.save(asset);
  }

  async getAsset(assetId: string): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });
    if (!asset) {
      throw new AssetNotFoundException(assetId);
    }
    return asset;
  }

  async updateAsset(
    assetId: string,
    updateAssetDto: UpdateAssetDto,
  ): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });
    if (!asset) {
      throw new AssetNotFoundException(assetId);
    }
    const updatedAsset = this.assetRepository.merge(asset, updateAssetDto);
    return this.assetRepository.save(updatedAsset);
  }

  async deleteAsset(assetId: string): Promise<void> {
    const result = await this.assetRepository.delete(assetId);
    if (result.affected === 0) {
      throw new AssetNotFoundException(assetId);
    }
  }
}
