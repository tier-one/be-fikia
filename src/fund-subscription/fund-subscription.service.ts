import { Injectable, NotFoundException } from '@nestjs/common';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Fund } from 'src/fund/entities/fund.entity';
import {
  AssetNotFoundException,
  FundNotFoundException,
  InvestorNotFoundException,
} from 'src/middlewares/fund.exceptions';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Asset } from 'src/fund-asset/entities/Asset.entity';

@Injectable()
export class FundSubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Fund)
    private fundRepository: Repository<Fund>,
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
    fundId: string,
    investorId: string,
  ): Promise<Subscription> {
    const fund = await this.fundRepository.findOne({
      where: { id: fundId },
    });
    const investor = await this.userRepository.findOne({
      where: { id: investorId },
    });

    if (!fund) {
      throw new FundNotFoundException(fundId);
    }

    if (!investor) {
      throw new InvestorNotFoundException(investorId);
    }

    const latestAsset = await this.assetRepository.findOne({
      where: { fundId: { id: fundId } },
      order: { createdAt: 'DESC' },
    });

    if (!latestAsset) {
      throw new AssetNotFoundException('No assets found for the fund');
    }

    const numberOfShares =
      createSubscriptionDto.amountInvested / latestAsset.assetBalance;

    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      fundId: fund,
      investorId: investor,
      numberOfShares,
    });

    return this.subscriptionRepository.save(subscription);
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

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      relations: ['fundId', 'investorId'],
    });
  }

  async deleteSubscription(subscriptionId: string): Promise<void> {
    await this.subscriptionRepository.delete(subscriptionId);
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
}
