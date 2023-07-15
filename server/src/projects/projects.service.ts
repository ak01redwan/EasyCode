import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findById(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { id: id } });
  }

  async create(projectData: Project): Promise<Project> {
    const newProject = this.projectRepository.create(projectData);
    return this.projectRepository.save(newProject);
  }

  async update(id: number, projectData: Partial<Project>): Promise<Project> {
    const projectToUpdate = await this.projectRepository.findOne({
      where: { id: id },
    });
    this.projectRepository.merge(projectToUpdate, projectData);
    return this.projectRepository.save(projectToUpdate);
  }

  async delete(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
