import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { Exam } from './entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  async create(@Body() createExamDto: CreateExamDto): Promise<Exam> {
    return this.examsService.create(createExamDto);
  }

  @Get()
  async findAll(): Promise<Exam[]> {
    return this.examsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Exam> {
    const exam = await this.examsService.findOne(id);
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }
    return exam;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateExamDto: UpdateExamDto): Promise<Exam> {
    return this.examsService.update(id, updateExamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.examsService.remove(id);
  }

  @Get('/stage/:stageId')
  async findByStage(@Param('stageId') stageId: number): Promise<Exam[]> {
    return this.examsService.findByStage(stageId);
  }

  @Post('/calculate-result/:stageId')
  async calculateResult(@Param('stageId') stageId: number, @Body() examAnswers: { examId: number, answer: string }[]): Promise<number> {
    return this.examsService.calculateResult(stageId, examAnswers);
  }
}
