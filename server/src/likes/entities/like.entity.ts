import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Course, (course) => course.likes)
  course: Course;
}