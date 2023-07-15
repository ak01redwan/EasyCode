import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { plainToClass } from 'class-transformer';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Project> {
    return this.projectsService.findById(id);
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    const project = plainToClass(Project, createProjectDto);
    return this.projectsService.create(project);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = plainToClass(Project, updateProjectDto);
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.projectsService.delete(id);
  }
}
