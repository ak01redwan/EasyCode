import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notification } from './notification.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  // relations

  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @ManyToOne(() => Notification, notification => notification.statuses)
  notification: Notification;
}