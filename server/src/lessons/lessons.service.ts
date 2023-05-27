import { Injectable } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>
    ) {}
  
  async create(lesson: Lesson) {
    return await this.lessonsRepository.save(lesson);
  }

  async findAll() {
    return await this.lessonsRepository.find();
  }

  async findOne(id: number) {
    return await this.lessonsRepository.find({ where: { id: id }});
  }

  async update(lesson: Lesson) {
    return await this.lessonsRepository.save(lesson);
  }

  async remove(id: number) {
    await this.lessonsRepository.delete(id);
  }
}
