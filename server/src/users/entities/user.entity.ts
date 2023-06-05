import { Like } from 'src/likes/entities/like.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;
  
  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  userType: string;

  @Column()
  userDescription: string;

  @Column()
  picturePath: string;

  @Column()
  signupDate: Date;

  @Column()
  birthDate: Date;

  @Column()
  address: string;

  @Column({ nullable: true })
  currentCourseId: string;

  @Column({ nullable: true })
  certificationsDocsPath: string;

  @Column({ default: true })
  isConfirmed: boolean;

  @Column({ default: true })
  isDeleted: boolean;

  // realtions
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Subscription, subscribe => subscribe.user)
  subscriptions: Subscription[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
