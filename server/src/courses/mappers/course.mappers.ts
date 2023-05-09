import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Course } from '../entities/course.entity';

export class CourseMapper {
  static toEntity(createCourseDto: CreateCourseDto): Course {
    const course = new Course();
    course.createdDate = new Date();
    course.modificationDate = new Date();
    course.imagePath = createCourseDto.imagePath;
    course.name = createCourseDto.name;
    course.description = createCourseDto.description;
    course.isPublished = createCourseDto.isPublished;
    course.category = createCourseDto.category;
    return course;
  }

  static toEntityWithModificationDate(updateCourseDto: UpdateCourseDto): Course {
    const course = new Course();
    course.imagePath = updateCourseDto.imagePath;
    course.name = updateCourseDto.name;
    course.description = updateCourseDto.description;
    course.isPublished = updateCourseDto.isPublished;
    course.category = updateCourseDto.category;
    course.modificationDate = new Date();
    return course;
  }
}
