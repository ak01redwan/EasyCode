import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  documentPath: string;

  @Column({ type: 'varchar', length: 255 })
  imagePath: string;

  @Column({ type: 'text', nullable: true })
  supervisorComment: string;

  @Column({ type: 'integer', default: 0 })
  refusedTimes: number;

  @Column({ default: () => 'getdate()' })
  createdDate: Date;

  @Column({ type: 'tinyint', default: false })
  isSubmitted: boolean;

  @Column({ type: 'tinyint', default: false })
  isAcceptedAndDone: boolean;
}