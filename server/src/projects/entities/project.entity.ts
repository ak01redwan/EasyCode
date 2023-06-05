import { Like } from 'src/likes/entities/like.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column({ default: false })
  isSubmitted: boolean;

  @Column({ default: false })
  isAcceptedAndDone: boolean;

  // relations
  @OneToMany(() => Like, (like) => like.project)
  likes: Like[];
}