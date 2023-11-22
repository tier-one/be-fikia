import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FundTransaction } from './entities/Transation.entity';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { FundTransactionService } from './fund-transaction.service';

@Controller('Transaction')
export class FundTransactionController {}
