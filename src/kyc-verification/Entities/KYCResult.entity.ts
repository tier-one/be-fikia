import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('KYCResult')
export class KYCResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  jobId: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  jobResult: string;

  @Column({ nullable: true })
  jobSuccess: boolean;

  @Column({ nullable: true })
  jobComplete: boolean;

  @Column({ nullable: true })
  timestamp: string;
}
