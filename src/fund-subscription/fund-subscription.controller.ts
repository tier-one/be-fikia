import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { FundSubscriptionService } from './fund-subscription.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@ApiTags('Subscription')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'subscription',
  version: '1',
})
export class FundSubscriptionController {
  constructor(private readonly subscriptionService: FundSubscriptionService) {}

  @Roles(RoleEnum.user)
  @Post('subscribe/:fundId')
  async createSubscription(
    @Req() req: Request,
    @Param('fundId') fundId: string,
    @Body(new ValidationPipe()) createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const investorId = (req.user as User).id;
    return this.subscriptionService.createSubscription(
      createSubscriptionDto,
      fundId,
      investorId,
    );
  }

  @Roles(RoleEnum.user)
  @Get(':subscriptionId')
  async getSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<Subscription> {
    return this.subscriptionService.getSubscriptionById(subscriptionId);
  }

  @Roles(RoleEnum.manager)
  @Get()
  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionService.getAllSubscriptions();
  }

  @Roles(RoleEnum.user)
  @Delete(':subscriptionId')
  async deleteSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<void> {
    return this.subscriptionService.deleteSubscription(subscriptionId);
  }

  @Roles(RoleEnum.manager)
  @Patch(':subscriptionId/approve')
  async approveSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<string> {
    return this.subscriptionService.approveSubscription(subscriptionId);
  }

  @ApiTags('Portfolio')
  @Roles(RoleEnum.user)
  @Get('portfolio')
  async getPortfolio(@Req() req: Request) {
    const investorId = (req.user as User).id;

    return await this.subscriptionService.getInvestorPortfolio(investorId);
  }
}
