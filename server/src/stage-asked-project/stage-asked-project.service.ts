import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStageAskedProjectDto } from './dto/create-stage-asked-project.dto';
import { UpdateStageAskedProjectDto } from './dto/update-stage-asked-project.dto';
import { StageAskedProject } from './entities/stage-asked-project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from 'src/stages/entities/stage.entity';

@Injectable()
export class StageAskedProjectService {
  constructor(
    @InjectRepository(StageAskedProject)
    private readonly stageAskedProjectRepository: Repository<StageAskedProject>,
    @InjectRepository(Stage)
    private readonly stagesServicesRepository: Repository<Stage>,
  ) {}

<<<<<<< HEAD
  async create(
    stageAskedProject: StageAskedProject,
  ): Promise<StageAskedProject> {
    if (
      await this.stagesServicesRepository.findOne({
        where: { id: stageAskedProject.stage.id },
      })
    ) {
      return await this.stageAskedProjectRepository.save(stageAskedProject);
    } else {
      throw new NotFoundException(
        `we don't found the stage that you want to add this asked project under it. (${stageAskedProject.stage.title})`,
      );
    }
=======
  async create(stageAskedProject: StageAskedProject): Promise<StageAskedProject> {
    return await this.stageAskedProjectRepository.save(stageAskedProject);
>>>>>>> main
  }

  async findAll(): Promise<StageAskedProject[]> {
    return await this.stageAskedProjectRepository.find();
  }

  async findOne(id: number): Promise<StageAskedProject> {
    return await this.stageAskedProjectRepository.findOne({
      where: { id: id },
    });
  }

  async findByStageId(stageId: number): Promise<StageAskedProject> {
    return this.stageAskedProjectRepository.findOne({
      where: { stage: { id: stageId } },
    });
  }

  async update(
    stageAskedProject: StageAskedProject,
  ): Promise<StageAskedProject> {
    return await this.stageAskedProjectRepository.save(stageAskedProject);
  }

  async remove(id: number): Promise<void> {
    await this.stageAskedProjectRepository.delete(id);
  }
}
