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
import { ColumnNumericTransformer } from '../../fund-asset/entities/ColumnNumericTransformer';
import { Fund } from 'src/fund/entities/fund.entity';

@Entity()
export class FundTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  assetId: Asset;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @Column({
    type: 'enum',
    enum: [
      'subscription',
      'redemption',
      'transfer',
      'dividend',
      'fee',
      'other',
    ],
    default: 'subscription',
  })
  transactionType: string;

  @Column('decimal', {
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled', 'failed'],
    default: 'pending',
  })
  status: string;

  @Column('text', { nullable: true })
  note: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
