import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StageAskedProjectService } from './stage-asked-project.service';
import { CreateStageAskedProjectDto } from './dto/create-stage-asked-project.dto';
import { UpdateStageAskedProjectDto } from './dto/update-stage-asked-project.dto';
import { plainToClass } from 'class-transformer';
import { StageAskedProject } from './entities/stage-asked-project.entity';

@Controller('stage-asked-project')
export class StageAskedProjectController {
  constructor(private readonly stageAskedProjectService: StageAskedProjectService) {}

  @Post()
  async create(@Body() createStageAskedProjectDto: CreateStageAskedProjectDto): Promise<StageAskedProject> {
    const stageAskedProject = plainToClass(StageAskedProject, createStageAskedProjectDto);
    return await this.stageAskedProjectService.create(stageAskedProject);
  }

  @Get()
  async findAll(): Promise<StageAskedProject[]> {
    return await this.stageAskedProjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StageAskedProject> {
    return await this.stageAskedProjectService.findOne(+id);
  }

  @Get('/stage/:id')
  async findByStageId(@Param('id') id: string): Promise<StageAskedProject>{
    return await this.stageAskedProjectService.findByStageId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStageAskedProjectDto: UpdateStageAskedProjectDto) {
    const stageAskedProject = plainToClass(StageAskedProject, updateStageAskedProjectDto);
    return this.stageAskedProjectService.update(stageAskedProject);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stageAskedProjectService.remove(+id);
  }
}
