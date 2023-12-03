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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@ApiTags('Subscription')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'subscription',
  version: '1',
})
export class FundSubscriptionController {
  constructor(private readonly subscriptionService: FundSubscriptionService) { }

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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all subscriptions by Investor', description: 'This endpoint is for investors to retrieve their own subscriptions.' })
  @ApiResponse({ status: 200, description: 'List of subscriptions for the logged-in investor' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only accessible by authenticated investors.' })
  @Roles(RoleEnum.user)
  @Get()
  async getUserSubscriptions(@Req() req: Request): Promise<Subscription[] | { message: string }> {
    const userId = (req.user as User).id;
    const subscriptions = await this.subscriptionService.getUserSubscriptions(userId);

    if (subscriptions.length === 0) {
      return { message: "You don't have any subscriptions." };
    }

    return subscriptions;
  }


  @Roles(RoleEnum.user)
  @Delete(':subscriptionId')
  async deleteSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<void> {
    return this.subscriptionService.deleteSubscription(subscriptionId);
  }

  @Roles(RoleEnum.user)
  @Patch(':subscriptionId')
  async updateSubscription(
    @Req() req: Request,
    @Param('subscriptionId') subscriptionId: string,
    @Body(new ValidationPipe()) updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const investorId = (req.user as User).id;
    return this.subscriptionService.updateSubscription(subscriptionId, investorId, updateSubscriptionDto);
  }

  @Get('fund/:fundId/investor')
  async getSubscriptionsByFundIdForInvestor(@Req() req: Request, @Param('fundId') fundId: string): Promise<Subscription[] | { message: string }> {
    const investorId = (req.user as User).id;
    const subscriptions = await this.subscriptionService.getSubscriptionsByFundIdForInvestor(fundId, investorId);

    if (subscriptions.length === 0) {
      return { message: "That fund has no subscriptions yet." };
    }

    return subscriptions;
  }
}

@ApiTags('For Manager')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'subscriptions',
  version: '1',
})
export class FundSubscriptionByManagerController {

  constructor(private readonly subscriptionService: FundSubscriptionService) { }

  @Roles(RoleEnum.manager)
  @ApiOperation({ summary: 'For Manager to Approve a Subscription', description: 'This endpoint allows a manager to approve a specific subscription.' })
  @ApiResponse({ status: 200, description: 'The subscription has been successfully approved.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only accessible by managers.' })
  @Patch(':subscriptionId/approve')
  async approveSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<string> {
    return this.subscriptionService.approveSubscription(subscriptionId);
  }

  @Roles(RoleEnum.manager)
  @ApiOperation({ summary: 'For Manager to Reject a Subscription', description: 'This endpoint allows a manager to reject a specific subscription.' })
  @ApiResponse({ status: 200, description: 'The subscription has been successfully rejected.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only accessible by managers.' })
  @Patch(':subscriptionId/reject')
  async rejectSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<string> {
    return this.subscriptionService.rejectSubscription(subscriptionId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'For managers to get all subscriptions based on their fund(s) ', description: 'This endpoint is for retrieving all subscriptions.' })
  @ApiResponse({ status: 200, description: 'List of all subscriptions' })
  @Roles(RoleEnum.manager, RoleEnum.admin)
  @Get()
  async getAllSubscriptions(@Req() req: Request): Promise<Subscription[] | { message: string }> {
    const managerId = (req.user as User).id;
    const subscriptions = await this.subscriptionService.getAllSubscriptions(managerId);

    if (subscriptions.length === 0) {
      return { message: "There are no subscriptions available." };
    }

    return subscriptions;
  }

  @Get('fund/:fundId/manager')
  async getSubscriptionsByFundIdForManager(@Req() req: Request, @Param('fundId') fundId: string): Promise<Subscription[] | { message: string }> {
    const managerId = (req.user as User).id;
    const subscriptions = await this.subscriptionService.getSubscriptionsByFundIdForManager(fundId, managerId);

    if (subscriptions.length === 0) {
      return { message: "Your fund has no subscriptions yet." };
    }

    return subscriptions;
  }

}


@ApiTags('Investor Portfolio')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'subscriptions',
  version: '1',
})
export class FundPortfolioController {

  constructor(private readonly subscriptionService: FundSubscriptionService) { }
  @Roles(RoleEnum.user)
  @Get('portfolio')
  async getPortfolio(@Req() req: Request) {
    const investorId = (req.user as User).id;
    return await this.subscriptionService.getInvestorPortfolio(investorId);
  }

}
