import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsBoolean()
  isDeleted: boolean;

  @IsNotEmpty()
  @IsString()
  textContent: string;

  @IsNotEmpty()
  DateAndTime: Date;

  @IsNotEmpty()
  senderId: number;

  @IsNotEmpty()
  courseId: number;
}