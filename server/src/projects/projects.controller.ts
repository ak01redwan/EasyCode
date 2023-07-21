import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFiles, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { plainToClass } from 'class-transformer';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileToDiskStorage } from 'src/helpers/upload-file';
import { Multer } from 'multer';
import * as fs from 'fs';
import { AuthGuard } from 'src/auth/auth.guard'

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
  
  @UseGuards(AuthGuard)
  @Get('/getByStageAskedProjectId/:id')
  async getByStageAskedProjectId(@Param('id') id: number,@Request() req) {
    if (req.authData.user.userType != 'student') { return null };
    return await this.projectsService.getByStageAskedProjectId(id, req.authData.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/unacceptedProjects/:stageId')
  async getUnacceptedProjects(@Param('stageId') stageId: string, @Request() req) {
    return await this.projectsService.getUnacceptedProjectsOfUserId(req.authData.user.id, +stageId);
  }
  
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 2, UploadFileToDiskStorage),
  )
  async create(@Body() createProjectDto: CreateProjectDto, @UploadedFiles() files: Multer.File[]): Promise<Project> {
    // first lets extract the prject files (image and document)
    const [imageFile, projectFile] = files;
    try {
      createProjectDto.askedProject = JSON.parse(`${createProjectDto.askedProject}`);
      createProjectDto.student = JSON.parse(`${createProjectDto.student}`);
      const project = plainToClass(Project, createProjectDto);
      project.supervisorComment = "waiting for supervisor comment and confirmation";
      project.isSubmitted = true;
      // setup paths
      project.imagePath = `/uploads/${imageFile.filename}`;
      project.documentPath = `/uploads/${projectFile.filename}`;
      return this.projectsService.create(project);
    } catch (error) {
      try {
        imageFile ? fs.unlinkSync(imageFile.path) : null;
        projectFile ? fs.unlinkSync(projectFile.path) : null;
      } catch (error) {
        console.log('error on project controller inside the create method');
      }
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = plainToClass(Project, updateProjectDto);
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.projectsService.delete(id);
  }
}
