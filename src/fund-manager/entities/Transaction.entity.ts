import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AssetTable } from '../entities/Asset.entity';
import { TransactionType } from '../enums/transaction-type.enum';
import { ColumnNumericTransformer } from './ColumnNumericTransformer';

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

  @ManyToOne(() => AssetTable)
  @JoinColumn({ name: 'assetId' })
  assetId: AssetTable;

  @Column('decimal')
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
