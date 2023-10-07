import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Fund } from './entities/fund.entity';
import { Equal, Repository } from 'typeorm';
import { CreateFundDto } from './dto/create-fund.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AssetTable } from './entities/Asset.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionTable } from './entities/Transaction.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Order } from './entities/Order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Balance } from './entities/Balance.entity';
import { OrderType } from './enums/order-type.enum';
import { OrderStatus } from './enums/order-status.enum';
import { Subscription } from './entities/Subscription.entity';

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
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async createFund(
    managerId: string,
    investorId: string,
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
      where: { id: investorId },
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

    const fund = this.fundRepository.create({
      ...createFundDto,
      managerId: manager,
      investorId: user,
    });

    const savedFund = await this.fundRepository.save(fund);

    const balanceData = {
      investorId: user,
      managerId: manager,
      fundId: savedFund,
      investmentMinimum: createFundDto.investmentMinimum,
      fundBalance: createFundDto.investmentMinimum,
    };

    const existingBalance = await this.balanceRepository.findOne({
      where: {
        investorId: { id: balanceData.investorId.id },
      },
    });
    if (existingBalance) {
      balanceData.fundBalance =
        Number(balanceData.fundBalance) + Number(existingBalance.fundBalance);
    }

    const balance = this.balanceRepository.create(balanceData);
    await this.balanceRepository.save(balance);

    return savedFund;
  }

  async getFund(fundId: string): Promise<{ fund: Fund; balance: Balance }> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new NotFoundException('Fund not found');
    }
    const balance = await this.balanceRepository.findOne({
      where: {
        fundId: Equal(fund.id),
      },
    });

    if (!balance) {
      throw new NotFoundException('Balance not found');
    }

    return { fund, balance };
  }

  async createAsset(
    managerId: string,
    createAssetDto: CreateAssetDto,
  ): Promise<AssetTable> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
    const assetData = this.assetRepository.create({
      ...createAssetDto,
      managerId: manager,
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

  async placeOrder(
    investorId: string,
    assetId: string,
    fundId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });
    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });

    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!investor) {
      throw new NotFoundException(`Manager with ID ${investorId} not found`);
    }

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    if (!fund) {
      throw new NotFoundException(`Asset with ID ${fundId} not found`);
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      assetId: asset,
      fundId: fund,
      investorId: investor,
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
  async executeOrder(orderId: string, investorId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['fundId'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });

    if (!investor) {
      throw new NotFoundException(`Investor with ID ${investorId} not found`);
    }

    let balance = await this.balanceRepository.findOne({
      where: { investorId: Equal(investor.id) },
      order: { createdAt: 'DESC' },
    });

    if (!balance) {
      balance = this.balanceRepository.create({
        investorId: investor,
        managerId: order.fundId.managerId,
        fundId: order.fundId,
        investmentMinimum: 0,
        fundBalance: 0,
      });

      balance = await this.balanceRepository.save(balance);
    } else {
    }

    if (
      order.orderType === OrderType.BUY &&
      balance.fundBalance < order.price
    ) {
      throw new BadRequestException('Insufficient balance');
    }

    if (order.orderType === OrderType.BUY) {
      const newBalance = this.balanceRepository.create({
        investorId: investor,
        managerId: order.fundId.managerId,
        fundId: order.fundId,
        investmentMinimum: 0,
        fundBalance: balance.fundBalance - order.price,
      });
      await this.balanceRepository.save(newBalance);
    } else if (order.orderType === OrderType.SELL) {
      const updatedFundBalance = balance.fundBalance + order.price;
      const newBalance = this.balanceRepository.create({
        investorId: investor,
        managerId: order.fundId.managerId,
        fundId: order.fundId,
        investmentMinimum: 0,
        fundBalance: updatedFundBalance,
      });

      await this.balanceRepository.save(newBalance);
    }

    order.orderStatus = OrderStatus.PENDING;
    const savedOrder = await this.orderRepository.save(order);

    return savedOrder;
  }

  async createSubscription(
    investorId: string,
    fundId: string,
  ): Promise<Subscription> {
    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });
    const fund = await this.fundRepository.findOne({ where: { id: fundId } });

    if (!investor || !fund) {
      throw new NotFoundException('Investor or Fund not found');
    }

    const subscription = this.subscriptionRepository.create({
      investor,
      fund,
      status: 'pending',
    });

    return this.subscriptionRepository.save(subscription);
  }
}
