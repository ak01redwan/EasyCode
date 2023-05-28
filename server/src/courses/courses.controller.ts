import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseMapper } from './mappers/course.mappers';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const course = CourseMapper.toEntity(createCourseDto);
      return await this.coursesService.create(course);
    } catch (error) {
      if (error.number == '2627') { // 2627 sql error for duplicate value
        throw new HttpException(`course with name '${createCourseDto.name}' already exists.`, HttpStatus.CONFLICT);
      }
      throw new HttpException(`Internal server error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return await this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    const course = await this.coursesService.findOne(+id);
    if (!course) {
      throw new HttpException(`Course with ID '${id}' not found.`, HttpStatus.NOT_FOUND);
    }
    return course;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<Course> {
    try {
      const course = CourseMapper.toEntityWithModificationDate(updateCourseDto);
      return await this.coursesService.update(+id, course);
    } catch (error) {
      if (error.number == '2627') { // 2627 sql error for duplicate value
        throw new HttpException(`course with name '${updateCourseDto.name}' already exists.`, HttpStatus.CONFLICT);
      }
      throw new HttpException(`Internal server error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.coursesService.remove(+id);
  }
}