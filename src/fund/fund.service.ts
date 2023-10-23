import { Injectable, NotFoundException } from '@nestjs/common';
import { Fund } from './entities/fund.entity';
import { EntityManager, Equal, Repository } from 'typeorm';
import { CreateFundDto } from './dto/create-fund.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  ManagerNotFoundException,
  FundNotFoundException,
  FundAlreadyExistsException,
  ManagerDoesNotHaveFundException,
} from 'src/middlewares/fund.exceptions';
import { FundBalance } from './entities/FundBalance.entity';

@Injectable()
export class FundService {
  constructor(
    @InjectRepository(Fund)
    private readonly fundRepository: Repository<Fund>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FundBalance)
    private fundBalanceRepository: Repository<FundBalance>,
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

  async getFund(fundId: string, managerId: string): Promise<{ fund: Fund; balance: FundBalance }> {
    const manager = await this.userRepository.findOne({ where: { id: managerId } });
    if (!manager) {
      throw new ManagerNotFoundException(managerId);
    }
  
    const fund = await this.fundRepository.findOne({
      where: { id: fundId, managerId: Equal(manager.id) }
    });
  
    if (!fund) {
      throw new ManagerDoesNotHaveFundException(managerId, fundId);
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
  async getAllFund(managerId: string): Promise<{ fund: Fund; balance: FundBalance }[]> {
    const funds = await this.fundRepository.find({ where: { managerId: Equal(managerId) } });
  
    if (!funds.length) {
      throw new NotFoundException('You have no fund yet');
    }
  
    const fundsWithBalances: { fund: Fund; balance: FundBalance }[] = [];
    for (const fund of funds) {
      const balance = await this.fundBalanceRepository.findOne({
        where: {
          fundId: Equal(fund.id),
        },
      });
  
      if (!balance) {
        throw new NotFoundException('No balance found for your fund: ' + fund.id);
      }
  
      fundsWithBalances.push({ fund, balance });
    }
  
    return fundsWithBalances;
  }
}
