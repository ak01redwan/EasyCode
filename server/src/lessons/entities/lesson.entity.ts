import { Stage } from "src/stages/entities/stage.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    recommandedTimes: number;

    @Column()
    url: string;

    // relations
    @ManyToOne(() => Stage, (stage) => stage.lessons)
    stage: Stage;
}
