import { Stage } from 'src/stages/entities/stage.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StageAskedProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  documentsPath: string;

  // relations
  @ManyToOne(() => Stage, (stage) => stage.stageAskedProjects)
  stage: Stage;
}
