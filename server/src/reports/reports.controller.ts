import { Controller, Get, Body, Param, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async getGeneralReport(@Body() createReportDto: CreateReportDto) {
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

  @Get('/courses')
  async getCoursesReport(@Body() createReportDto: CreateReportDto) {
    return await this.reportsService.getCoursesReport(createReportDto.fromDate, createReportDto.toDate);
  }
}
