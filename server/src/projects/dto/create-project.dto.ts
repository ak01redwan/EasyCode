import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProjectDto {

  @MinLength(4)
  title: string;
  
  @IsString()
  @IsNotEmpty()
  askedProject: StageAskedProject

  @IsNotEmpty()
  student: User;
}
