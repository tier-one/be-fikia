import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ColumnNumericTransformer } from '../../fund/entities/ColumnNumericTransformer';
import { Fund } from 'src/fund/entities/fund.entity';

export enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
  TRANSFER = 'transfer',
  DIVIDEND = 'dividend',
  INTEREST = 'interest',
  REDEMPTION = 'redemption',
  CONTRIBUTION = 'contribution',
  DISTRIBUTION = 'distribution',
  EXCHANGE = 'exchange',
  OTHER = 'other',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

@Entity()
export class FundTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.OTHER,
    nullable: true, 
  })
  transactionType: TransactionType;

  @Column({ nullable: true }) 
  investorFullNames: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true, 
  })
  amount: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    nullable: true, 
  })
  price: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
    nullable: true, 
  })
  status: TransactionStatus;

  @Column('text', { nullable: true }) 
  note: string;

  @Column({ type: 'date', nullable: true }) 
  tradeDate: Date;

  @Column({ nullable: true }) 
  broker: string;

  @Column({ nullable: true }) 
  typeOfTransaction: string;

  @Column({ nullable: true }) 
  typeOfInstrument: string;

  @Column({ nullable: true }) 
  instrument: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true }) 
  numberOfShares: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true }) 
  commission: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
