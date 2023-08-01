import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseMapper } from './mappers/course.mappers';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileToDiskStorage } from 'src/helpers/upload-file';
import { Multer } from 'multer';
import * as fs from 'fs';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 1, UploadFileToDiskStorage))
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFiles() files: Multer.File[],
  ): Promise<Course> {
    const [image] = files;
    try {
      const course = CourseMapper.toEntity(createCourseDto);
      course.imagePath = `/uploads/${image.filename}`;
      return await this.coursesService.create(course);
    } catch (error) {
      if (image) {
        try {
          fs.unlinkSync(image.path);
        } catch (error) {}
      }
      if (error.number == '2627') {
        // 2627 sql error for duplicate value
        throw new HttpException(
          `course with name '${createCourseDto.name}' already exists.`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        `Internal server error: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('toggleCoursePublished/:id')
  async toggleCoursePublished(@Param('id') id: string): Promise<Course> {
    return await this.coursesService.toggleCoursePublished(+id);
  }

  @Post('adminForThisCourse/:id')
  async assignCourseAdmin(
    @Param('id') id: string,
    @Body() supervisorInfo: any,
  ): Promise<Course> {
    console.log('hited');
    return await this.coursesService.assignCourseAdmin(+id, supervisorInfo);
  }
  // all actors student, admin, supervisor, course admin
  @Get()
  async findAll(): Promise<Course[]> {
    return await this.coursesService.findAll();
  }

  // all actors student, admin, supervisor, course admin
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    const course = await this.coursesService.findOne(+id);
    if (!course) {
      throw new HttpException(
        `Course with ID '${id}' not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  // for admin and course admin
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    try {
      const course = CourseMapper.toEntityWithModificationDate(updateCourseDto);
      return await this.coursesService.update(+id, course);
    } catch (error) {
      if (error.number == '2627') {
        // 2627 sql error for duplicate value
        throw new HttpException(
          `course with name '${updateCourseDto.name}' already exists.`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        `Internal server error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // for admin if this course dose not have content inside it
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.coursesService.remove(+id);
  }
}
