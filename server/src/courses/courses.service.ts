import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseMapper } from './mappers/course.mappers';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private coursesRepository: Repository<Course>) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = CourseMapper.toEntity(createCourseDto);
    return await this.coursesRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.coursesRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Course> {
    return await this.coursesRepository.findOne({ where: { id }, relations: ['category'] });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const existingCourse = await this.coursesRepository.findOne({ where: { id }, relations: ['category'] });
    if (!existingCourse) {
      throw new HttpException(`Course with ID '${id}' not found.`, HttpStatus.NOT_FOUND);
    }
    const updatedCourse = CourseMapper.toEntityWithModificationDate(updateCourseDto);
    updatedCourse.id = existingCourse.id;
    return await this.coursesRepository.save(updatedCourse);
  }

  async remove(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}