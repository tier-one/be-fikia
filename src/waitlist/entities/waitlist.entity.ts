import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaitList extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true, nullable: true })
  email: string;
}
