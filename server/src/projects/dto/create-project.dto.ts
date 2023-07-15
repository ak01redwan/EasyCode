import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @MinLength(4)
  title: string;

  @IsString()
  @IsNotEmpty()
  documentPath: string;

  @IsString()
  @IsNotEmpty()
  imagePath: string;

  @IsString()
  @IsOptional()
  supervisorComment?: string;

  @IsInt()
  @IsOptional()
  refusedTimes?: number;

  @IsBoolean()
  @IsOptional()
  isSubmitted?: boolean;

  @IsBoolean()
  @IsOptional()
  isAcceptedAndDone?: boolean;
}
