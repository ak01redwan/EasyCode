import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsDate, IsNotEmpty } from 'class-validator';

<<<<<<< HEAD
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
=======

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsNotEmpty()
    isPublished: boolean;
}
>>>>>>> main
