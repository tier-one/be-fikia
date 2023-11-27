import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Asset } from './entities/Asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import {
  AssetNotFoundException,
  FundNotFoundException,
  ManagerNotFoundException,
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
    createAssetDto: CreateAssetDto,
    managerId: string,
  ): Promise<Asset> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });

    if (!manager) {
      throw new ManagerNotFoundException(managerId);
    }

    const assetBalance = createAssetDto.price;
    const asset = this.assetRepository.create({
      ...createAssetDto,
      managerId: manager,
      assetBalance,
    });

    return this.assetRepository.save(asset);
  }

  async getAsset(assetId: string, managerId: string): Promise<Asset> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    if (!manager) {
      throw new ManagerNotFoundException(managerId);
    }

    const asset = await this.assetRepository.findOne({
      where: { id: assetId, managerId: Equal(manager.id) },
    });
    if (!asset) {
      throw new AssetNotFoundException(assetId);
    }
    return asset;
  }

  async updateAsset(
    assetId: string,
    updateAssetDto: UpdateAssetDto,
    managerId: string,
  ): Promise<Asset> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    if (!manager) {
      throw new ManagerNotFoundException(managerId);
    }

    const asset = await this.assetRepository.findOne({
      where: { id: assetId, managerId: Equal(manager.id) },
    });
    if (!asset) {
      throw new AssetNotFoundException(assetId);
    }
    const updatedAsset = this.assetRepository.merge(asset, updateAssetDto);
    return this.assetRepository.save(updatedAsset);
  }

  async getAllAssets(managerId: string): Promise<Asset[]> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    if (!manager) {
      throw new ManagerNotFoundException(managerId);
    }
  
    const assets = await this.assetRepository.find({
      where: { managerId: Equal(managerId) },
    });
  
    if (!assets.length) {
      throw new NotFoundException('You have no asset yet');
    }
  
    return assets;
  }
  async deleteAsset(assetId: string, managerId: string): Promise<void> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    if (!manager) {
      throw new ManagerNotFoundException(managerId);
    }

    if (!assetId) {
      throw new Error('Asset ID is not defined');
    }
    const result = await this.assetRepository.delete(assetId);
    if (result.affected === 0) {
      throw new AssetNotFoundException(assetId);
    }
  }

  async getAllAssetsByFund(
    fundId: string,
    managerId: string,
  ): Promise<Asset[]> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    if (!manager) {
      throw new ManagerNotFoundException(managerId);
    }
    const fund = await this.fundRepository.findOne({
      where: { id: fundId, managerId: Equal(manager.id) },
    });
    if (!fund) {
      throw new FundNotFoundException(fundId);
    }

    const assets = await this.assetRepository.find({
      where: { fundId: Equal(fundId) },
    });

    return assets;
  }
}
