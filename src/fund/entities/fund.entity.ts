import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ColumnNumericTransformer } from './ColumnNumericTransformer';

@Entity()
export class Fund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  managerId: User;

  @Column()
  FundName: string;

  @Column()
  FundGoal: string;

  @Column()
  FundSymbol: string;

  @Column()
  FundType: string;

  @Column()
  FundLogo: string;

  @Column()
  AccoutDepositoryBankName: string;

  @Column()
  AccountDepositoryAccountNumber: string;

  @Column()
  CashAccountBankName: string;

  @Column()
  CashAccountNumber: string;

  @Column()
  CustodianBankName: string;

  @Column()
  CustodianParcentage: number;

  @Column()
  TrustBankName: string;

  @Column()
  TrustPercentage: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0.0,
    nullable: true,
  })
  ManagementFee: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0.0,
    nullable: true,
  })
  FundInitialValue: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0.0,
    nullable: true,
  })
  FundLiabilities: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0.0,
    nullable: true,
  })
  SharesOutstanding: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
