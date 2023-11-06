import { Asset } from 'src/fund-asset/entities/Asset.entity';
import { ColumnNumericTransformer } from 'src/fund/entities/ColumnNumericTransformer';
import { Fund } from 'src/fund/entities/fund.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';

// Investment
@Entity()
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @Column()
  portfolioId: string;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  assetId: Asset;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column()
  investmentDate: Date;
}

// Transaction
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  assetId: Asset;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column()
  transactionDate: Date;

  @Column()
  transactionType: string;
  @Column()
  portfolioId: string;
}

// Portfolio
@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @OneToMany(() => Investment, (investment) => investment.portfolioId)
  investments: Investment[];

  @OneToMany(() => Transaction, (transaction) => transaction.portfolioId)
  transactions: Transaction[];
}

// Holdings
@Entity()
export class Holdings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  assetId: Asset;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  quantity: number;
}

// Current Asset Values
@Entity()
export class CurrentAssetValues {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  assetId: Asset;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  currentValue: number;
}

// Historical Data
@Entity()
export class HistoricalData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  assetId: Asset;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column()
  date: Date;
}

// Fund Value (NAV)
@Entity()
export class FundValueNAV {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  nav: number;

  @Column()
  date: Date;
}
