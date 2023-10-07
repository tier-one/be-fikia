import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AssetTable } from './Asset.entity';
import { OrderType } from '../enums/order-type.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from 'src/users/entities/user.entity';
import { Fund } from './fund.entity';
import { ColumnNumericTransformer } from './ColumnNumericTransformer';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AssetTable)
  @JoinColumn({ name: 'assetId' })
  assetId: AssetTable;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'investorId' })
  investorId: User;

  @ManyToOne(() => Fund)
  @JoinColumn({ name: 'fundId' })
  fundId: Fund;

  @Column({ type: 'enum', enum: OrderType })
  orderType: OrderType;

  @Column({ type: 'enum', enum: OrderStatus })
  orderStatus: OrderStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
