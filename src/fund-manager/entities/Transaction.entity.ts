import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AssetTable } from '../entities/Asset.entity';
import { TransactionType } from '../enum/transaction-type.enum';

@Entity()
export class TransactionTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  managerId: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne(() => AssetTable)
  @JoinColumn({ name: 'assetId' })
  assetId: AssetTable;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  price: number;

  @Column('text', { nullable: true })
  notes: string;
}
