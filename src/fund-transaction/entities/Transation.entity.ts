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
import { Asset } from '../../fund-asset/entities/Asset.entity';
import { ColumnNumericTransformer } from '../../fund/entities/ColumnNumericTransformer';

enum TransactionType {
  BUY = 'buy',
  SELL = 'sell',
  TRANSFER = 'transfer',
  DIVIDEND = 'dividend',
  INTEREST = 'interest',
  REDEMPTION = 'redemption',
  CONTRIBUTION = 'contribution',
  DISTRIBUTION = 'distribution',
  EXCHANGE = 'exchange',
  OTHER = 'other' // Placeholder for any other types not listed
}

enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed'
}

@Entity()
export class FundTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  assetId: Asset;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.OTHER
  })
  transactionType: TransactionType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  })
  status: TransactionStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('text', { nullable: true })
  note: string;
}
