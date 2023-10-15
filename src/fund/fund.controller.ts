import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateFundDto } from './dto/create-fund.dto';
import { FundService } from './fund.service';

@ApiTags('Fund')
@ApiBearerAuth()
@Roles(RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'fund',
  version: '1',
})
export class FundController {
  constructor(private readonly fundService: FundService) {}

  @Post('create-fund/:managerId')
  async createFund(
    @Param('managerId') managerId: string,
    @Body(new ValidationPipe()) createFundDto: CreateFundDto,
  ) {
    try {
      const fund = await this.fundService.createFund(managerId, createFundDto);
      return { message: 'Fund created successfully', fund };
    } catch (error) {
      throw error;
    }
  }
  @Get('get-fund/:fundId')
  async getFund(@Param('fundId') fundId: string) {
    try {
      const fund = await this.fundService.getFund(fundId);
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-fund')
  async getAllFund() {
    try {
      const fund = await this.fundService.getAllFund();
      return { message: 'Fund retrieved successfully', fund };
    } catch (error) {
      throw error;
    }
  }
}
