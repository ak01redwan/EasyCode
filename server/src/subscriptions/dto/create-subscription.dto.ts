import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

export class CreateSubscriptionDto {
  isDone: boolean;
  scores: number;
  user: User;
  course: Course;
}
