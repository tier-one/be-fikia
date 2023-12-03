import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from 'src/fund/entities/ColumnNumericTransformer';
import { Fund } from 'src/fund/entities/fund.entity';
import { User } from 'src/users/entities/user.entity';

export enum SubscriptionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended',
  PROCESSING = 'processing',
}
@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amountInvested: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  numberOfShares: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  navPerClient: {
    [clientName: string]: number;
  };

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  subscriptionDate: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
