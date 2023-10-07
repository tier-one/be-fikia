import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Fund } from './entities/fund.entity';
import { Equal, MoreThanOrEqual, Repository } from 'typeorm';
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
import { FundSetup } from './entities/fund-setup.entity';
import { CreateFundSetupDto } from './dto/fund-setup.dto';
import { FundValue } from './entities/FundValue.entity';

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
    @InjectRepository(FundSetup)
    private fundSetupRepository: Repository<FundSetup>,
    @InjectRepository(FundValue)
    private fundValueRepository: Repository<FundValue>,
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
  async getAllFund(): Promise<{ fund: Fund; balance: Balance }[]> {
    const funds = await this.fundRepository.find();

    if (!funds.length) {
      throw new NotFoundException('No fund setup found');
    }

    const fundsWithBalances: { fund: Fund; balance: Balance }[] = [];
    for (const fund of funds) {
      const balance = await this.balanceRepository.findOne({
        where: {
          fundId: Equal(fund.id),
        },
      });

      if (!balance) {
        throw new NotFoundException('Balance not found for fund: ' + fund.id);
      }

      fundsWithBalances.push({ fund, balance });
    }

    return fundsWithBalances;
  }

  async createFundSetup(
    managerId: string,
    investorId: string,
    createFundSetupDto: CreateFundSetupDto,
  ) {
    const investor = await this.userRepository.findOne({
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

    if (!investor) {
      throw new BadRequestException(
        'Investor with the provided ID does not exist',
      );
    }
    const fundSetup = this.fundSetupRepository.create({
      ...createFundSetupDto,
      managerId: manager,
      investorId: investor,
    });

    return this.fundSetupRepository.save(fundSetup);
  }
  async getFundSetUp(fundSetupId: string): Promise<FundSetup> {
    const fundSetup = await this.fundSetupRepository.findOne({
      where: { id: fundSetupId },
    });

    if (!fundSetup) {
      throw new NotFoundException('Fund setup not found');
    }

    return fundSetup;
  }

  async getAllFundSetUp(): Promise<FundSetup[]> {
    const fundSetup = await this.fundSetupRepository.find();

    if (!fundSetup.length) {
      throw new NotFoundException('No fund setup found');
    }

    return fundSetup;
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
      throw new NotFoundException(`Fund with ID ${managerId} not found`);
    }
    if (!fund) {
      throw new NotFoundException(`Fund with ID ${fundId} not found`);
    }

    const assetData = this.assetRepository.create({
      ...createAssetDto,
      managerId: manager,
      fundId: fund,
    });

    const savedAsset = await this.assetRepository.save(assetData);

    const fundValue = this.fundValueRepository.create({
      fundId: fund,
      value: savedAsset.value,
    });

    await this.fundValueRepository.save(fundValue);

    return savedAsset;
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
  async getAllAsset(): Promise<AssetTable[]> {
    const asset = await this.assetRepository.find();

    if (!asset.length) {
      throw new NotFoundException('No asset setup found');
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
  async getTransaction(transactionId: string): Promise<TransactionTable> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
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
  async getAllOrders(): Promise<Order[]> {
    const order = await this.orderRepository.find();

    if (!order.length) {
      throw new NotFoundException('No order setup found');
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

      const fund = await this.fundRepository.findOne({
        where: { id: order.fundId.id },
      });
      if (fund) {
        fund.sharesOutstanding += order.quantity;
        await this.fundRepository.save(fund);
      }
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

      const fund = await this.fundRepository.findOne({
        where: { id: order.fundId.id },
      });
      if (fund) {
        fund.sharesOutstanding -= order.quantity;
        await this.fundRepository.save(fund);
      }
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
  async getAllSuscription(): Promise<Subscription[]> {
    const subscription = await this.subscriptionRepository.find();

    if (!subscription.length) {
      throw new NotFoundException('No subscription setup found');
    }

    return subscription;
  }

  async calculateAUM(fundId: string): Promise<number> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new NotFoundException(`Fund with ID ${fundId} not found`);
    }

    const assets = await this.assetRepository.find({
      where: {
        fundId: Equal(fund.id),
      },
    });

    const totalValue = assets.reduce((sum, asset) => sum + asset.price, 0);

    return totalValue;
  }

  async calculateNAV(fundId: string): Promise<number> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new NotFoundException(`Fund with ID ${fundId} not found`);
    }

    const assets = await this.assetRepository.find({
      where: {
        fundId: Equal(fund.id),
      },
    });

    const totalValue = assets.reduce((sum, asset) => sum + asset.price, 0);

    const NAV = (totalValue - fund.fundLiabilities) / fund.sharesOutstanding;

    return NAV;
  }

  async calculateYTDReturn(fundId: string): Promise<number> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new NotFoundException(`Fund with ID ${fundId} not found`);
    }

    const assets = await this.assetRepository.find({
      where: {
        fundId: Equal(fund.id),
      },
    });

    const currentValue = assets.reduce((sum, asset) => sum + asset.price, 0);

    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const initialValueRecord = await this.fundValueRepository.findOne({
      where: {
        fundId: Equal(fund.id),
        createdAt: MoreThanOrEqual(startOfYear),
      },
      order: { createdAt: 'ASC' },
    });

    if (!initialValueRecord) {
      throw new NotFoundException(
        `No fund value record found for the start of the year.`,
      );
    }

    const initialValue = initialValueRecord.value;
    if (initialValue === 0) {
      throw new BadRequestException('The Initial Value is Zero.');
    }

    const YTDReturn = ((currentValue - initialValue) / initialValue) * 100;

    return YTDReturn;
  }

  async calculateCumulativeReturn(fundId: string): Promise<number> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new NotFoundException(`Fund with ID ${fundId} not found`);
    }

    const assets = await this.assetRepository.find({
      where: {
        fundId: Equal(fund.id),
      },
    });

    const currentValue = assets.reduce((sum, asset) => sum + asset.price, 0);

    const initialValueRecord = await this.fundValueRepository.findOne({
      where: {
        fundId: Equal(fund.id),
      },
      order: { createdAt: 'ASC' },
    });

    if (!initialValueRecord) {
      throw new NotFoundException(
        `No fund value record found for the start of the investment.`,
      );
    }

    const initialValue = initialValueRecord.value;

    if (initialValue === 0) {
      throw new BadRequestException('The Initial Value is Zero.');
    }

    const cumulativeReturn =
      ((currentValue - initialValue) / initialValue) * 100;

    return cumulativeReturn;
  }
}
