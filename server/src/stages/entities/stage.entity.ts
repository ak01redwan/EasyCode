import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  hasProject: boolean;

  // relations
  @ManyToOne(() => Course, (course) => course.stages)
  course: Course;

  @OneToMany(() => Subscription, subscriptions => subscriptions.currentStage)
  subscriptions: Subscription[];
}