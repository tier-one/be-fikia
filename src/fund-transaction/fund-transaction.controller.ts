import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FundTransactionService } from './fund-transaction.service';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { UpdateTransactionDto } from './dto/UpdateTransactionDto';
import { FundTransaction } from './entities/Transation.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Transaction')
@ApiBearerAuth()
@Roles(RoleEnum.manager)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'transaction', version: '1' })
export class FundTransactionController {
  constructor(
    private readonly fundTransactionService: FundTransactionService,
  ) {}

  @Post('transactions/:fundId')
  async createTransaction(
    @Param('fundId') fundId: string,
    @Req() req: Request,
    @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto,
  ): Promise<FundTransaction> {
    const userId = (req.user as User).id;
    return this.fundTransactionService.createTransaction(
      createTransactionDto,
      fundId,
      userId,
    );
  }

  @Get(':transactionId')
  async getTransaction(
    @Param('transactionId') transactionId: string,
    @Req() req: Request,
  ): Promise<FundTransaction> {
    const userId = (req.user as User).id;
    return this.fundTransactionService.getTransaction(transactionId, userId);
  }

  @Patch(':transactionId')
  async updateTransaction(
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: Request,
  ): Promise<FundTransaction> {
    const userId = (req.user as User).id;
    return this.fundTransactionService.updateTransaction(
      transactionId,
      updateTransactionDto,
      userId,
    );
  }

  @Delete(':transactionId')
  async deleteTransaction(
    @Param('transactionId') transactionId: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = (req.user as User).id;
    return this.fundTransactionService.deleteTransaction(transactionId, userId);
  }

  @Get()
  async getAllTransactions(@Req() req: Request): Promise<FundTransaction[]> {
    const userId = (req.user as User).id;
    return this.fundTransactionService.getAllTransactions(userId);
  }

  @Get('assets/:fundId/transactions')
  async getAllTransactionsForAsset(
    @Param('fundId') fundId: string,
    @Req() req: Request,
  ): Promise<FundTransaction[]> {
    const userId = (req.user as User).id;
    return this.fundTransactionService.getAllTransactionsForAsset(
      fundId,
      userId,
    );
  }
}
