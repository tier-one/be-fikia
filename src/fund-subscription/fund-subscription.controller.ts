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
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'subscription',
  version: '1',
})
export class FundSubscriptionController {
  constructor(private readonly subscriptionService: FundSubscriptionService) { }

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
  

  @Get(':subscriptionId')
  async getSubscription(
    @Param('subscriptionId') subscriptionId: string, 
  ): Promise<Subscription> {
    return this.subscriptionService.getSubscriptionById(subscriptionId);
  }
  

  @Get()
  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionService.getAllSubscriptions();
  }

  @Delete(':subscriptionId')
  async deleteSubscription(
    @Param('subscriptionId') subscriptionId: string, 
  ): Promise<void> {
    return this.subscriptionService.deleteSubscription(subscriptionId);
  }
  

  @ApiTags('Approve subscription')
  @Patch(':subscriptionId/approve')
  async approveSubscription(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<string> {
    return this.subscriptionService.approveSubscription(subscriptionId);
  }


  @ApiTags('Portfolio')
  @Get('portfolio')
  async getPortfolio(@Req() req: Request) {
    const investorId = (req.user as User).id;

    return await this.subscriptionService.getInvestorPortfolio(investorId);
  }

}
