import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Fund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  managerId: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column({ unique: true })
  fundName: string;

  @Column()
  fundType: string;

  @Column()
  custodian: string;

  @Column()
  accountNumber: string;

  @Column()
  fundStrategy: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  investmentMinimum: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  managementFee: number;
}
