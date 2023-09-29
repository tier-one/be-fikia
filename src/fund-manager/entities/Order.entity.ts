import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AssetTable } from './Asset.entity';
import { OrderType } from '../enum/order-type.enum';
import { OrderStatus } from '../enum/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AssetTable)
  @JoinColumn({ name: 'assetId' })
  assetId: AssetTable;

  @Column({ type: 'enum', enum: OrderType })
  orderType: OrderType;

  @Column({ type: 'enum', enum: OrderStatus })
  orderStatus: OrderStatus;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  price: number;
}
