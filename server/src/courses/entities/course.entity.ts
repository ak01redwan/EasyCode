import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

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

  @ManyToOne(() => Category, category => category.courses)
  category: Category;
}