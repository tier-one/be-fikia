import { Injectable } from '@nestjs/common';
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

  async getAllAssets(): Promise<Asset[]> {
    return await this.assetRepository.find();
  }
  async deleteAsset(assetId: string): Promise<void> {
    const result = await this.assetRepository.delete(assetId);
    if (result.affected === 0) {
      throw new AssetNotFoundException(assetId);
    }
  }

  async getAllAssetsByFund(fundId: string): Promise<Asset[]> {
    // Check if the fund exists
    const fund = await this.fundRepository.findOne({where:{id:fundId}});
    if (!fund) {
      throw new FundNotFoundException(fundId);
    }
  
    // Retrieve all assets for the fund
    const assets = await this.assetRepository.find({
      where: { fundId: Equal(fundId) }
    });
  
    return assets;
  }
  
}
