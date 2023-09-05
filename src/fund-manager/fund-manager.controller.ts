import {
  Body,
  Controller,
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
import { FundManagerService } from './fund-manager.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiBearerAuth()
@Roles(RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Fund Manager')
@Controller({
  path: 'fund-manager',
  version: '1',
})
export class FundManagerController {
  constructor(private readonly fundManagerService: FundManagerService) {}

  @Post('create-fund/:managerId')
  async createFund(
    @Param('managerId') managerId: string,
    @Body(new ValidationPipe()) createFundDto: CreateFundDto,
  ) {
    try {
      const fund = await this.fundManagerService.createFund(
        managerId,
        createFundDto,
      );
      return { message: 'Fund created successfully', fund };
    } catch (error) {
      throw error;
    }
  }

  @Post('create-transaction/:managerId/:assetId')
  createTransaction(
    @Param('managerId') managerId: string,
    @Param('assetId') assetId: string,
    @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto,
  ) {
    return this.fundManagerService.createTransaction(
      managerId,
      assetId,
      createTransactionDto,
    );
  }
}
