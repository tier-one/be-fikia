import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FundTransaction } from './entities/Transation.entity';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { FundTransactionService } from './fund-transaction.service';

@Controller('Transaction')
export class FundTransactionController {
  constructor(private readonly transactionService: FundTransactionService) {}

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<FundTransaction> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get(':transactionId')
  async getTransaction(
    @Param('transactionId') transactionId: string,
  ): Promise<FundTransaction> {
    return this.transactionService.getTransaction(transactionId);
  }

  @Get()
  async getAllTransactions(): Promise<FundTransaction[]> {
    return this.transactionService.getAllTransactions();
  }
}
