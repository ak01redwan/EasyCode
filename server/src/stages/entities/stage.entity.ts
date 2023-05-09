import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  hasProject: boolean;

  @ManyToOne(() => Course, (course) => course.stages)
  course: Course;
}