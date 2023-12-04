import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateFundDto } from './dto/create-fund.dto';
import { FundService } from './fund.service';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UpdateFundDto } from './dto/update-fund.dto';
import { Fund } from './entities/fund.entity';

@ApiTags('Fund')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'fund',
  version: '1',
})
export class FundController {
  constructor(private readonly fundService: FundService) {}

  @Roles(RoleEnum.manager)
  @Post('create-fund')
  async createFund(
    @Req() req: Request,
    @Body(new ValidationPipe()) createFundDto: CreateFundDto,
  ) {
    const managerId = (req.user as User).id;

    try {
      const fund = await this.fundService.createFund(managerId, createFundDto);
      return { message: 'Fund created successfully', fund };
    } catch (error) {
      throw error;
    }
  }
  @Roles(RoleEnum.manager,RoleEnum.user,RoleEnum.admin)
  @ApiOperation({
    summary: 'Investor , Manager and Admin can  get Funds details by Passing Fund Id',
  })
  @ApiResponse({
    status: 200,
    description: 'The Fund has been successfully retreived.',
  })
  @Get('get-fund/:fundId')
  async getFund(@Param('fundId') fundId: string, @Req() req: Request) {
    console.log('req.user:', req.user);
    if (!req.user) {
      throw new Error('User is not authenticated');
    }
    try {
      const fund = await this.fundService.getFund(fundId);
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }

  @Roles(RoleEnum.manager)
  @Get('get-all-fund')
  async getAllFund(@Req() req: Request) {
    if (!req.user) {
      throw new Error('User is not authenticated');
    }
    const managerId = (req.user as User).id;
    try {
      const fund = await this.fundService.getAllFund(managerId);
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }

  @Roles(RoleEnum.manager)
  @Patch(':id')
  async updateFund(
    @Param('id') fundId: string,
    @Body() updateFundDto: UpdateFundDto,
  ): Promise<Fund> {
    return this.fundService.updateFund(fundId, updateFundDto);
  }

  @Roles(RoleEnum.manager)
  @Delete(':id')
  async deleteFund(@Param('id') fundId: string): Promise<void> {
    return this.fundService.deleteFund(fundId);
  }
}


@Roles(RoleEnum.user,RoleEnum.admin)
@ApiTags('Fund')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'funds',
  version: '1',
})
export class FundInvestorController{
  constructor(private readonly fundService: FundService) {}

  @ApiOperation({
    summary: 'For Investor to retrieve all Funds',
  })
  @ApiResponse({
    status: 200,
    description: 'The Funds has been successfully retreived.',
  })
  @Get('get-all-funds')
  async getAllFunds() {
    try {
      const fund = await this.fundService.getAllFunds();
      return { message: 'Funds retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }
}