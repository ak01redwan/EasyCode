import { Controller, Get, Body, Param, NotFoundException, NotAcceptableException, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async getGeneralReport(@Body() createReportDto: any) {
    return await this.reportsService.getGeneralReport(createReportDto.fromDate, createReportDto.toDate);
  }

  @Get('/users/:userType')
  async getUsersReportOfType(@Param('userType') userType: 'supervisor' | 'student', @Body() createReportDto: CreateReportDto) {
    if (userType == 'supervisor' || userType == 'student') {
      return await this.reportsService.getUsersReportOfType(userType, createReportDto.fromDate, createReportDto.toDate);
    } else {
      throw new NotAcceptableException(`${userType} is not recognized the recognized types are (supervisor or student)`);;
    }
  }

  @Post('/courses')
  async getCoursesReport(@Body() createReportDto: CreateReportDto) {
    return await this.reportsService.getCoursesReport(createReportDto.fromDate, createReportDto.toDate);
  }
}
