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

  @Column({ type: 'date' })
  tradeDate: Date;

  @Column()
  broker: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @Column()
  typeOfInstrument: string;

  @Column()
  instrument: string;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  numberOfShares: number;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  commission: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
  })
  status: TransactionStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
