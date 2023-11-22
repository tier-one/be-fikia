import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/fund-asset/entities/Asset.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository, Equal } from 'typeorm';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { UpdateTransactionDto } from './dto/UpdateTransactionDto';
import { FundTransaction } from './entities/Transation.entity';
import {
  UserNotFoundException,
  TransactionNotFoundException,
} from 'src/middlewares/fund.exceptions';

@Injectable()
export class FundTransactionService {
  constructor(
    @InjectRepository(FundTransaction)
    private readonly transactionRepository: Repository<FundTransaction>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    assetId: string,
    userId: string,
  ): Promise<FundTransaction> {
    console.log(`Received assetId: ${assetId}`);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const asset = await this.assetRepository.findOne({
      where: { id: assetId },
    });
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    console.log(`Retrieved asset with ID: ${asset.id}`);

    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      assetId: asset,
      userId: user,
    });

    return this.transactionRepository.save(transaction);
  }

  async getTransaction(
    transactionId: string,
    userId: string,
  ): Promise<FundTransaction> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId, userId: Equal(user.id) },
    });
    if (!transaction) {
      throw new TransactionNotFoundException(transactionId);
    }
    return transaction;
  }

  async updateTransaction(
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
    userId: string,
  ): Promise<FundTransaction> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId, userId: Equal(user.id) },
    });
    if (!transaction) {
      throw new TransactionNotFoundException(transactionId);
    }

    const updatedTransaction = this.transactionRepository.merge(
      transaction,
      updateTransactionDto,
    );
    return this.transactionRepository.save(updatedTransaction);
  }

  async getAllTransactions(userId: string): Promise<FundTransaction[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const transactions = await this.transactionRepository.find({
      where: { userId: Equal(userId) },
    });

    if (!transactions.length) {
      throw new NotFoundException('No transactions found for this user');
    }

    return transactions;
  }

  async deleteTransaction(
    transactionId: string,
    userId: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    if (!transactionId) {
      throw new Error('Transaction ID is not defined');
    }
    const result = await this.transactionRepository.delete(transactionId);
    if (result.affected === 0) {
      throw new TransactionNotFoundException(transactionId);
    }
  }

  async getAllTransactionsForAsset(
    assetId: string,
    userId: string,
  ): Promise<FundTransaction[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const transactions = await this.transactionRepository.find({
      where: { assetId: Equal(assetId), userId: Equal(userId) },
    });

    if (!transactions.length) {
      throw new NotFoundException(
        `No transactions found for asset with ID ${assetId}`,
      );
    }

    return transactions;
  }
}
