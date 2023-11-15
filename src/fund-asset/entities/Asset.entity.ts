import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Fund } from '../../fund/entities/fund.entity';
import { ColumnNumericTransformer } from './ColumnNumericTransformer';

class EquityDetails {
  @Column({ nullable: false })
  tickerSymbol: string;

  @Column({ nullable: true })
  ISIN: string; 

  @Column({ nullable: false })
  companyName: string; 

  @Column({ nullable: true })
  description: string; 

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: false })
  exchange: string; 

  @Column({ nullable: true })
  sectorIndustry: string; 

  @Column({ nullable: true, type: 'int' })
  numberOfOutstandingShares: number;

  @Column({ nullable: true })
  assetClass: string;
  @Column({ nullable: true })
  countryOfDomicile: string; 
}

class FixedIncomeDetails {
  @Column({ nullable: false })
  fixedIncomeType: string; 

  @Column({ nullable: true })
  ISIN: string; 

  @Column({ nullable: false })
  fixedIncomeName: string; 

  @Column({ nullable: true })
  description: string; 

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: false })
  issuer: string;

  @Column({ nullable: true })
  countryOfIssuer: string; 

  @Column({ nullable: true })
  creditRating: string;

  @Column({ nullable: false, type: 'date' })
  maturityDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  couponRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  faceValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  yieldToMaturity: number; 

  @Column({ nullable: true })
  bondType: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  @Column({ nullable: true })
  paymentFrequency: string;
  @Column({ nullable: true })
  effectiveDuration: string; 

  @Column({ nullable: true })
  amortizationSchedule: string; 

  @Column({ nullable: true })
  optionality: string; 

  @Column({ nullable: true })
  callablePuttable: string; 
  @Column({ nullable: true, type: 'date' })
  issueDate: Date; 

  @Column({ nullable: true })
  listingExchange: string; 

}

class RealEstateDetails {
  @Column({ nullable: true })
  propertyAddress: string;

  @Column({ nullable: true })
  propertyType: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  rentalIncome: number;
}

class AlternativeInvestmentDetails {
  @Column({ nullable: true })
  investmentFundName: string;

  @Column({ nullable: true })
  investmentManager: string;

  @Column({ nullable: true })
  fundStrategy: string;
}

@Entity()
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  managerId: User;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0.0,
  })
  value: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0.0,
  })
  assetBalance: number;

  @Column('text', { nullable: true })
  note: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column(() => EquityDetails)
  equityDetails: EquityDetails;

  @Column(() => FixedIncomeDetails)
  fixedIncomeDetails: FixedIncomeDetails;

  @Column(() => RealEstateDetails)
  realEstateDetails: RealEstateDetails;

  @Column(() => AlternativeInvestmentDetails)
  alternativeInvestmentDetails: AlternativeInvestmentDetails;
}
