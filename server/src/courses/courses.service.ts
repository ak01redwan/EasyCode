import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseMapper } from './mappers/course.mappers';
import { User } from 'src/users/entities/user.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private coursesRepository: Repository<Course>,
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>
    ) {}

  async create(course: Course): Promise<Course> {
    return await this.coursesRepository.save(course);
  }

  async toggleCoursePublished(id: number) {
    const course = await this.coursesRepository.findOne({ where: { id }});
    course.isPublished = !course.isPublished;
    return await this.coursesRepository.save(course);
  }

  async assignCourseAdmin(id: number, supervisorInfo: any) {
    // get the course
    const course = await this.coursesRepository.findOne({ 
      where: { id },
      relations: ['stages']
    });
    // set the course's admin
    course.courseAdmin = {id: supervisorInfo.id} as User;
    // check if the admin already subscriped other way add subscription
    const sub = await this.subscriptionsRepository.findOne({ where: { course: course, user: course.courseAdmin }});
    if (!sub) {
      await this.subscriptionsRepository.save({
        user: course.courseAdmin,
        course: course,
        stage: course.stages[course.stages.length - 1]
      } as Subscription);
    }
    // save the course's changes
    return await this.coursesRepository.save(course);
  }

  async getCoursesByAdminId(adminId: number): Promise<Course[]> {
    return await this.coursesRepository.find({
      where: { courseAdmin: { id: adminId }},
      relations: [
        'category',
        'subscriptions',
        'stages',
        'likes',
        'courseAdmin'
      ]
    });
  }

  async findAll(): Promise<Course[]> {
    return await this.coursesRepository.find({ 
      relations: [
        'category',
        'subscriptions',
        'stages',
        'likes',
        'courseAdmin'
      ]
    });
  }

  async findOne(id: number): Promise<Course> {
    return await this.coursesRepository.findOne({ 
      where: { id },
      relations: [
        'category',
        'subscriptions',
        'stages',
        'likes',
        'courseAdmin'
      ] 
    });
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

  async updateCourse(course: Course): Promise<Course> {
    return await this.coursesRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.coursesRepository.findOneOrFail({ where: { id }, relations: ['stages'] });
    if (course.stages.length > 0) {
      throw new Error('Cannot delete course with associated stages.');
    }
    await this.coursesRepository.delete(id);
  }
}