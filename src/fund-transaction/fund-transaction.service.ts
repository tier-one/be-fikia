import { Injectable } from '@nestjs/common';
import { FundTransaction } from './entities/Transation.entity';
import { UpdateTransactionDto } from './dto/UpdateTransactionDto';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FundTransactionService {

    constructor(
        @InjectRepository(FundTransaction)
        private readonly transactionRepository: Repository<FundTransaction>,
      ) {}
    
      async createTransaction(createTransactionDto: CreateTransactionDto): Promise<FundTransaction> {
        const transaction = this.transactionRepository.create(createTransactionDto);
        return this.transactionRepository.save(transaction);
      }
    
      async getTransaction(transactionId: string): Promise<FundTransaction> {
        const transaction = await this.transactionRepository.findOne({ where: { id: transactionId } });
        if (!transaction) {
          throw new Error('Transaction not found');
        }
        return transaction;
      }
    
      async getAllTransactions(): Promise<FundTransaction[]> {
        return await this.transactionRepository.find();
      }
}
