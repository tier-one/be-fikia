import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class BankDetails extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: String, nullable: true })
  name: string;

  @Index()
  @Column({ type: String, nullable: true })
  branchName: string;

  @Index()
  @Column({ type: String, nullable: true })
  accountNumber: string;

  @Index()
  @Column({ type: String, nullable: true })
  swiftCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
