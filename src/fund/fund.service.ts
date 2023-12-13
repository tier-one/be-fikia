import { Injectable, NotFoundException } from '@nestjs/common';
import { Fund } from './entities/fund.entity';
import { EntityManager, Equal, Repository } from 'typeorm';
import { CreateFundDto } from './dto/create-fund.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  ManagerNotFoundException,
  FundAlreadyExistsException,
  FundNotFoundException,
} from 'src/middlewares/fund.exceptions';
import { FundBalance } from './entities/FundBalance.entity';
import { UpdateFundDto } from './dto/update-fund.dto';
import { FundTransaction } from 'src/fund-transaction/entities/Transation.entity';
import { Subscription } from 'src/fund-subscription/entities/subscription.entity';

@Injectable()
export class FundService {
  constructor(
    @InjectRepository(Fund)
    private readonly fundRepository: Repository<Fund>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FundBalance)
    private fundBalanceRepository: Repository<FundBalance>,
    @InjectRepository(FundTransaction)
    private fundTransactionRepository: Repository<FundTransaction>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly manager: EntityManager,
  ) {}

  async createFund(
    managerId: string,
    createFundDto: CreateFundDto,
  ): Promise<Fund> {
    const manager = await this.userRepository.findOne({
      where: { id: managerId },
    });

    if (!manager) {
      console.error(`Manager with ID ${managerId} not found`);
      throw new ManagerNotFoundException(managerId);
    }

    const existingFund = await this.fundRepository.findOne({
      where: { FundName: createFundDto.FundName },
    });

    if (existingFund) {
      console.error(`Fund with name ${createFundDto.FundName} already exists`);
      throw new FundAlreadyExistsException(createFundDto.FundName);
    }

    const fund = this.fundRepository.create({
      ...createFundDto,
      managerId: manager,
    });

    const savedFund = await this.manager.transaction(
      async (transactionalEntityManager) => {
        const savedFund = await transactionalEntityManager.save(fund);

        const fundBalance = this.fundBalanceRepository.create({
          managerId: manager,
          fundId: savedFund,
          fundBalance: 0,
        });

        await transactionalEntityManager.save(fundBalance);

        return savedFund;
      },
    );

    return savedFund;
  }

  async getFund(fundId: string): Promise<{ fund: Fund; balance: FundBalance }> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });

    if (!fund) {
      throw new FundNotFoundException(fundId);
    }

    const balance = await this.fundBalanceRepository.findOne({
      where: {
        fundId: Equal(fund.id),
      },
    });

    if (!balance) {
      throw new NotFoundException('Balance not found');
    }

    return { fund, balance };
  }

  async getAllManagerFunds(
    managerId: string,
  ): Promise<{ fund: Fund; balance: FundBalance | null }[]> {
    const funds = await this.fundRepository.find({
      where: { managerId: Equal(managerId) },
    });

    if (!funds.length) {
      throw new NotFoundException('You have no fund yet');
    }

    const fundsWithBalances: { fund: Fund; balance: FundBalance | null }[] = [];
    for (const fund of funds) {
      let balance = await this.fundBalanceRepository.findOne({
        where: {
          fundId: Equal(fund.id),
        },
      });

      if (!balance) {
        balance = null;
      }

      fundsWithBalances.push({ fund, balance });
    }

    return fundsWithBalances;
  }

  async getAllFunds(): Promise<{ fund: Fund; balance: FundBalance | null }[]> {
    const funds = await this.fundRepository.find();

    const fundsWithBalances: { fund: Fund; balance: FundBalance | null }[] = [];
    for (const fund of funds) {
      const balance = await this.fundBalanceRepository.findOne({
        where: {
          fundId: Equal(fund.id),
        },
      });

      fundsWithBalances.push({ fund, balance });
    }

    return fundsWithBalances;
  }

  async updateFund(
    fundId: string,
    updateFundDto: UpdateFundDto,
  ): Promise<Fund> {
    const fund = await this.fundRepository.findOne({ where: { id: fundId } });

    if (!fund) {
      throw new NotFoundException(`Fund with ID ${fundId} not found`);
    }

    const updatedFund = this.fundRepository.merge(fund, updateFundDto);

    return this.fundRepository.save(updatedFund);
  }

  async deleteFund(fundId: string): Promise<void> {
    const fundTransactions = await this.fundTransactionRepository.find({
      where: { fundId: Equal(fundId) },
    });
    await this.fundTransactionRepository.remove(fundTransactions);

    const fundBalances = await this.fundBalanceRepository.find({
      where: { fundId: Equal(fundId) },
    });
    await this.fundBalanceRepository.remove(fundBalances);

    const fundSubscriptions = await this.subscriptionRepository.find({
      where: { fundId: Equal(fundId) },
    });
    await this.subscriptionRepository.remove(fundSubscriptions);

    const result = await this.fundRepository.delete(fundId);

    if (result.affected === 0) {
      throw new NotFoundException(`Fund with ID ${fundId} not found`);
    }
}
}
