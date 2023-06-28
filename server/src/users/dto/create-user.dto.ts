import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsDate, IsOptional, IsEmpty } from 'class-validator';

export class CreateUserDto {
  isValid() {
    throw new Error('Method not implemented.');
  }
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  userType: string;

  @IsNotEmpty()
  userDescription: string;

  @IsNotEmpty()
  picturePath: string;

  @Transform( ({ value }) => value && new Date(value))
  @IsDate()
  birthDate: Date;

  @IsNotEmpty()
  address: string;

  @IsEmpty()
  @IsOptional()
  currentCourseId: string;

  @IsEmpty()
  @IsOptional()
  certificationsDocsPath: string;
}
