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
import { Order } from './entities/Order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

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
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createFund(
    managerId: string,
    userId: string,
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

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    if (!manager) {
      throw new BadRequestException(
        'Manager with the provided ID does not exist',
      );
    }

    if (!user) {
      throw new BadRequestException('User with the provided ID does not exist');
    }

    const data = {
      ...createFundDto,
      managerId: manager,
      userId: user,
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
    fundId: string,
    createAssetDto: CreateAssetDto,
  ): Promise<AssetTable> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });

    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (!fund) {
      throw new NotFoundException('fund not found');
    }

    const assetData = this.assetRepository.create({
      ...createAssetDto,
      managerId: manager,
      fundId: fund,
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
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    const transactionData = this.transactionRepository.create({
      ...createTransactionDto,
    });

    return this.transactionRepository.save(transactionData);
  }
  async viewTransaction(transactionId: string): Promise<TransactionTable> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id: transactionId },
        relations: ['assetId', 'managerId'],
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return transaction;
    } catch (error) {
      return error;
    }
  }

  async placeOrder(
    managerId: string,
    assetId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    if (!manager) {
      throw new NotFoundException(`Manager with ID ${managerId} not found`);
    }

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      assetId: asset,
    });

    return this.orderRepository.save(order);
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }
}
