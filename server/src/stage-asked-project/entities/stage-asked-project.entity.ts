<<<<<<< HEAD
import { Stage } from 'src/stages/entities/stage.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
=======
import { Project } from "src/projects/entities/project.entity";
import { Stage } from "src/stages/entities/stage.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> main

@Entity()
export class StageAskedProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  documentsPath: string;

<<<<<<< HEAD
  // relations
  @ManyToOne(() => Stage, (stage) => stage.stageAskedProjects)
  stage: Stage;
=======
    // relations
    @ManyToOne(() => Stage, (stage) => stage.stageAskedProjects)
    stage: Stage;

    @OneToMany(() => Project, project => project.askedProject)
    projects: Project[];
>>>>>>> main
}
