import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  constructor(private readonly subscriptionService: FundSubscriptionService) {}

  @Post('subscribe')
  async createSubscription(
    @Req() req: Request,
    @Param('Fund Id') fundId: string,
    @Body(new ValidationPipe()) createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const managerId = (req.user as User).id;
    return this.subscriptionService.createSubscription(
      createSubscriptionDto,
      fundId,
      managerId,
    );
  }

  @Get(':id')
  async getSubscription(
    @Param('Subscribe Id') subscriptionId: string,
  ): Promise<Subscription> {
    return this.subscriptionService.getSubscriptionById(subscriptionId);
  }

  @Get()
  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionService.getAllSubscriptions();
  }

  @Delete(':id')
  async deleteSubscription(
    @Param('Investor Id') subscriptionId: string,
  ): Promise<void> {
    return this.subscriptionService.deleteSubscription(subscriptionId);
  }

  // @Put(':id')
  // async updateSubscription(
  //   @Param('Subscription Id') subscriptionId: string,
  //   @Body(new ValidationPipe()) updateSubscriptionDto: UpdateSubscriptionDto,
  // ): Promise<Subscription> {
  //   return this.subscriptionService.updateSubscription(subscriptionId, updateSubscriptionDto);
  // }
}
