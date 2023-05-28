import { IsOptional } from "class-validator";
import { Course } from "src/courses/entities/course.entity";
import { Lesson } from "src/lessons/entities/lesson.entity";
import { User } from "src/users/entities/user.entity";

export class LikeDto {
    @IsOptional()
    user: User;

    @IsOptional()
    course: Course;

    @IsOptional()
    lesson: Lesson;
}