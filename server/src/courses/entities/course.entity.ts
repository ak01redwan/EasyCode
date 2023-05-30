import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Stage } from 'src/stages/entities/stage.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { subscribe } from 'diagnostics_channel';
import { Message } from 'src/messages/entities/message.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  createdDate: Date;

  @Column()
  modificationDate: Date;

  @Column({ default: false })
  isPublished: boolean;

  // realtions issues
  @OneToMany(() => Subscription, subscribe => subscribe.course)
  subscriptions: Subscription[];

  @ManyToOne(() => Category, category => category.courses)
  category: Category;

  @OneToMany(() => Stage, stage => stage.course)
  stages: Stage[];

  @OneToMany(() => Like, (like) => like.course)
  likes: Like[];

  @OneToMany(() => Message, message => message.course)
  messages: Message[];

}