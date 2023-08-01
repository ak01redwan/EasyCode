<<<<<<< HEAD
import { IsObject, MinLength } from 'class-validator';
import { Stage } from 'src/stages/entities/stage.entity';

export class CreateStageAskedProjectDto {
  @MinLength(5)
  name: string;

  @MinLength(10)
  documentsPath: string;

  @IsObject()
  stage: Stage;
=======
import { IsNotEmpty, MinLength } from "class-validator";
import { Stage } from "src/stages/entities/stage.entity";

export class CreateStageAskedProjectDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    stage: Stage;
>>>>>>> main
}
