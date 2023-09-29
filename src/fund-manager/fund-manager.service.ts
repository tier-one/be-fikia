import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Fund } from './entities/fund.entity';
import { Repository } from 'typeorm';
import { CreateFundDto } from './dto/create-fund.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AssetTable } from './entities/Asset.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionTable } from './entities/Transaction.entity';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class FundManagerService {
  constructor(
    @InjectRepository(Fund)
    private readonly fundRepository: Repository<Fund>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AssetTable)
    private assetRepository: Repository<AssetTable>,
    @InjectRepository(TransactionTable)
    private transactionRepository: Repository<TransactionTable>,
  ) {}

  async createFund(
    managerId: string,
    createFundDto: CreateFundDto,
  ): Promise<Fund> {
    if (createFundDto.investmentMinimum < 1000) {
      throw new BadRequestException(
        'Investment minimum should be at least 1000',
      );
    }

    const existingFund = await this.fundRepository.findOne({
      where: { fundName: createFundDto.fundName },
    });

    if (existingFund) {
      throw new BadRequestException('Fund with the same name already exists');
    }

    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    if (!manager) {
      throw new BadRequestException(
        'Manager with the provided ID does not exist',
      );
    }

    const data = {
      ...createFundDto,
      managerId: manager,
    };

    const fund = this.fundRepository.create(data);
    const savedFund = await this.fundRepository.save(fund);
    return savedFund;
  }

  async getFund(fundId: string): Promise<Fund> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new NotFoundException('Fund not found');
    }

    return fund;
  }

  async createAsset(
    managerId: string,
    createAssetDto: CreateAssetDto,
  ): Promise<AssetTable> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });

    const user = await this.userRepository.findOne({
      where: { id: createAssetDto.userId },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const assetData = this.assetRepository.create({
      ...createAssetDto,
      managerId: manager,
      userId: user,
    });

    return await this.assetRepository.save(assetData);
  }

  async getAsset(assetId: string): Promise<AssetTable> {
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return asset;
  }

  async createTransaction(
    managerId: string,
    assetId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionTable> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    const user = await this.userRepository.findOne({
      where: { id: createTransactionDto.userId },
    });
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    const transactionData = this.transactionRepository.create({
      ...createTransactionDto,
      managerId: manager,
      assetId: asset,
      userId: user,
    });

    return this.transactionRepository.save(transactionData);
  }
  async getTransaction(transactionId: string): Promise<TransactionTable> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
