import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsDate } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
