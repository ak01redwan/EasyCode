import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from './entities/stage.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>
    ) {}

  async findAll(): Promise<Stage[]> {
    return await this.stageRepository.find({ relations: ['course'] });
  }

  async findOne(id: number): Promise<Stage> {
    return await this.stageRepository.findOne({
      where: { id },
      relations: ['course'],
    });
  }

  async create(stage: Stage): Promise<Stage> {
    return await this.stageRepository.save(stage);
  }

  async update(id: number, stage: Stage): Promise<Stage> {
    return await this.stageRepository.save(stage);
  }

  async delete(id: number): Promise<void> {
    await this.stageRepository.delete(id);
  }
}