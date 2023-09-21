import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Message } from 'src/messages/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Exam } from 'src/exams/entities/exam.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { GeneralReport } from './entities/general.report.entity';
import { UsersReport } from './entities/users.report.entity';
import { CoursesReport } from './entities/courses.report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>
  ) {}

  /**
   * fromDate & toDate will get entities that are created between these dates
   * @param fromDate: Date | null => date datatype but nullable.
   * @param toDate: Date | null => date datatype but nullable.
   * ------------------------------------------------------------------
   * this will return a result of type (GeneralReport)
   * @returns: GeneralReport
   */
  async getGeneralReport(fromDate: Date | null,toDate: Date | null ): Promise<GeneralReport> {
    const generalReport: GeneralReport = new GeneralReport();
    // if one of them null then get all
    if (fromDate == null || toDate == null) {
      // get all users
      generalReport.users = await this.usersRepository.find({
        relations: ['likes','subscriptions','messages','projects']
      });
      // get all categories
      generalReport.categories = await this.categoriesRepository.find({
        relations: [
          'courses',
          'courses.stages',
          'courses.messages',
          'courses.projects',
          'courses.subscriptions',
          'courses.stages.exams',
          'courses.stages.lessons'
        ]
      });
    } else {
      // adding the users and categories from date to date
      generalReport.users = await this.usersRepository.find({
        where: { signupDate: Between(fromDate, toDate) },
        relations: ['likes','subscriptions','messages','projects']
      });
      generalReport.categories = await this.categoriesRepository.find({
        where: { courses: { createdDate: Between(fromDate, toDate)} },
        relations: [
          'courses',
          'courses.stages',
          'courses.messages',
          'courses.projects',
          'courses.subscriptions',
          'courses.stages.exams',
          'courses.stages.lessons'
        ]
      });
      generalReport.fromDate = fromDate;
      generalReport.toDate   = toDate;
    }
    return generalReport;
  }

  /**
   * fromDate & toDate will get users that are created between these dates
   * @param fromDate: Date | null => date datatype but nullable.
   * @param toDate:   Date | null => date datatype but nullable.
   * ------------------------------------------------------------------
   * userType will get users of type supervisor or student depend on what you enterd
   * @param userType: 'supervisor' | 'student'
   * ------------------------------------------------------------------
   * this will return a result of type (GeneralReport)
   * @returns: GeneralReport
   */
  async getUsersReportOfType(userType: 'supervisor' | 'student',fromDate: Date | null, toDate: Date | null ): Promise<UsersReport> {
    const usersReport: UsersReport = new UsersReport();
    // if one of them null then get all
    if (fromDate == null || toDate == null) {
      // get all users
      usersReport.users = await this.usersRepository.find({
        where: { userType: userType },
        relations: ['likes','subscriptions','messages','projects']
      });
    } else {
      // adding the users and categories from date to date
      usersReport.users = await this.usersRepository.find({
        where: { signupDate: Between(fromDate, toDate), userType: userType },
        relations: ['likes','subscriptions','messages','projects']
      });
      usersReport.fromDate = fromDate;
      usersReport.toDate   = toDate;
    }
    return usersReport;
  }

  async getCoursesReport(fromDate: Date | null, toDate: Date | null ): Promise<CoursesReport> {
    const coursesReport: CoursesReport = new CoursesReport();
    // if one of them null then get all
    if (fromDate == null || toDate == null) {
      coursesReport.courses = await this.coursesRepository.find({
        relations: [
          'courseAdmin',
          'category',
          'stages',
          'messages',
          'projects',
          'subscriptions',
          'stages.exams',
          'stages.lessons'
        ]
      });
    } else {
      coursesReport.courses = await this.coursesRepository.find({
        where: { createdDate: Between(fromDate, toDate) },
        relations: [
          'courseAdmin',
          'category',
          'stages',
          'messages',
          'projects',
          'subscriptions',
          'stages.exams',
          'stages.lessons'
        ]
      });
      coursesReport.fromDate = fromDate;
      coursesReport.toDate   = toDate;
    }
    return coursesReport;
  }
}
