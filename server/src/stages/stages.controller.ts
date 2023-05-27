import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { Stage } from './entities/stage.entity';
import { plainToClass } from 'class-transformer';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get()
  async findAll(): Promise<Stage[]> {
    return await this.stagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Stage> {
    return await this.stagesService.findOne(id);
  }

  @Post()
  async create(@Body() createStageDto: CreateStageDto): Promise<any> {
    const stage = plainToClass(Stage, createStageDto);
    return await this.stagesService.create(stage);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateStageDto: UpdateStageDto): Promise<Stage> {
    const stage = plainToClass(Stage, updateStageDto);
    stage.id = id;
    return await this.stagesService.update(id, stage);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.stagesService.delete(id);
  }
}