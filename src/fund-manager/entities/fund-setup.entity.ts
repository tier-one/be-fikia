import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class FundSetup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  managerId: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

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

  @Column()
  fundName: string;

  @Column()
  FundGoal: string;

  @Column()
  FundSymbol: string;

  @Column()
  fundType: string;

  @Column()
  fundLogo: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
