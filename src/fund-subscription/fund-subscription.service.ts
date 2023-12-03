import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Subscription, SubscriptionStatus } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Fund } from 'src/fund/entities/fund.entity';
import {
  FundBalanceNotFoundException,
  FundNotFoundException,
  InvestorNotFoundException,
  SubscriptionNotFoundException,
} from 'src/middlewares/fund.exceptions';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { FundBalance } from 'src/fund/entities/FundBalance.entity';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class FundSubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Fund)
    private fundRepository: Repository<Fund>,
    @InjectRepository(FundBalance)
    private fundBalanceRepository: Repository<FundBalance>,
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
    fundId: string,
    investorId: string,
  ): Promise<Subscription> {
    const fund = await this.fundRepository.findOne({ where: { id: fundId } });
    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });

    if (!fund) {
      throw new FundNotFoundException(fundId);
    }

    if (!investor) {
      throw new InvestorNotFoundException(investorId);
    }
    const numberOfShares =
      createSubscriptionDto.amountInvested / fund.currentShareValue;

    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      fundId: fund,
      investorId: investor,
      numberOfShares,
    });

    try {
      return await this.subscriptionRepository.save(subscription);
    } catch (error) {
      console.error('Error saving subscription:', error);
      throw error;
    }
  }

  async getSubscriptionById(subscriptionId: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
      relations: ['fundId', 'investorId'],
    });
    if (!subscription) {
      throw new NotFoundException(
        `Subscription with ID "${subscriptionId}" not found`,
      );
    }
    return subscription;
  }

  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { investorId: { id: userId } }, 
      relations: ['fundId', 'investorId'], 
    });
  }
  
  async getAllSubscriptions(managerId: string): Promise<Subscription[]> {
    return this.subscriptionRepository
      .createQueryBuilder('subscription')
      .innerJoinAndSelect('subscription.fundId', 'fund')
      .innerJoinAndSelect('subscription.investorId', 'investor')
      .where('fund.managerId = :managerId', { managerId })
      .getMany();
  }

  async getSubscriptionsByFundIdForInvestor(fundId: string, investorId: string): Promise<Subscription[]> {
    return this.subscriptionRepository
      .createQueryBuilder('subscription')
      .innerJoinAndSelect('subscription.fundId', 'fund')
      .innerJoinAndSelect('subscription.investorId', 'investor')
      .where('fund.id = :fundId AND investor.id = :investorId', { fundId, investorId })
      .getMany();
  }
  
  async getSubscriptionsByFundIdForManager(fundId: string, managerId: string): Promise<Subscription[]> {
    return this.subscriptionRepository
      .createQueryBuilder('subscription')
      .innerJoinAndSelect('subscription.fundId', 'fund')
      .innerJoinAndSelect('subscription.investorId', 'investor')
      .where('fund.id = :fundId AND fund.managerId = :managerId', { fundId, managerId })
      .getMany();
  }

  async deleteSubscription(subscriptionId: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
      relations: ['fundId'],
    });
  
    if (!subscription) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }
  
    if (!subscription.fundId) {
      throw new Error('Fund ID is not defined for the subscription');
    }
  
    const fundBalance = await this.fundBalanceRepository.findOne({
      where: { fundId: { id: subscription.fundId.id } },
    });
  
    if (!fundBalance) {
      throw new FundBalanceNotFoundException(subscription.fundId.id);
    }
  
    fundBalance.fundBalance -= subscription.amountInvested;
    await this.fundBalanceRepository.save(fundBalance);
  
    await this.subscriptionRepository.delete(subscriptionId);
  }

  async updateSubscription(subscriptionId: string, investorId: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id: subscriptionId }, relations: ['investorId', 'fundId'] });
  
    if (!subscription) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }
  
    if (subscription.investorId.id !== investorId) {
      throw new UnauthorizedException('You are not authorized to update this subscription');
    }
  
    const fundBalance = await this.fundBalanceRepository.findOne({ where: { fundId: { id: subscription.fundId.id } } });
  
    if (!fundBalance) {
      throw new FundBalanceNotFoundException(subscription.fundId.id);
    }
  
    if (updateSubscriptionDto.amountInvested === undefined) {
      throw new Error('amountInvested is not defined in updateSubscriptionDto');
    }
    
    const amountDifference = updateSubscriptionDto.amountInvested - subscription.amountInvested;
   fundBalance.fundBalance += amountDifference;
    await this.fundBalanceRepository.save(fundBalance);
  
    const updatedSubscription = Object.assign(subscription, updateSubscriptionDto);
  
    return this.subscriptionRepository.save(updatedSubscription);
  }
  
  async getInvestorPortfolio(investorId: string): Promise<any> {
    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });
    if (!investor) {
      throw new InvestorNotFoundException(investorId);
    }

    const subscriptions = await this.subscriptionRepository.find({
      where: { investorId: Equal(investor.id) },
      relations: ['fundId'],
    });

    const fundsSummary = new Map<
      string,
      { sumInvested: number; totalShares: number }
    >();

    subscriptions.forEach((sub) => {
      let fund = fundsSummary.get(sub.fundId.FundName);
      if (!fund) {
        fund = { sumInvested: 0, totalShares: 0 };
        fundsSummary.set(sub.fundId.FundName, fund);
      }
      fund.sumInvested += sub.amountInvested;
      fund.totalShares += sub.numberOfShares;
    });

    const portfolioItems = Array.from(
      fundsSummary,
      ([fundName, { sumInvested, totalShares }]) => ({
        fundName,
        sumInvested,
        numberOfShares: totalShares,
      }),
    );

    const totalInvested = Array.from(fundsSummary.values()).reduce(
      (acc, fund) => acc + fund.sumInvested,
      0,
    );

    return {
      portfolioItems,
      totalInvested,
    };
  }

  async approveSubscription(subscriptionId: string): Promise<string> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
      relations: ['fundId'],
    });

    if (!subscription) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }

    if (!subscription.fundId) {
      throw new Error('Fund ID is not defined for the subscription');
    }

    if (subscription.status === SubscriptionStatus.APPROVED) {
      return 'Subscription is already approved.';
    }

    await this.subscriptionRepository.update(subscriptionId, {
      status: SubscriptionStatus.APPROVED,
    });

    const fundBalance = await this.fundBalanceRepository.findOne({
      where: { fundId: { id: subscription.fundId.id } },
    });

    if (!fundBalance) {
      throw new FundBalanceNotFoundException(subscription.fundId.id);
    }

    fundBalance.fundBalance += subscription.amountInvested;
    await this.fundBalanceRepository.save(fundBalance);

    return 'Subscription approved successfully.';
  }

  async rejectSubscription(subscriptionId: string): Promise<string> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
      relations: ['fundId'],
    });
  
    if (!subscription) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }
  
    if (subscription.status === SubscriptionStatus.REJECTED) {
      return 'Subscription is already rejected.';
    }
  
    await this.subscriptionRepository.update(subscriptionId, {
      status: SubscriptionStatus.REJECTED,
    });
  
    return 'Subscription rejected successfully.';
  }
}
