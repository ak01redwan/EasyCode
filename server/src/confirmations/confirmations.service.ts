import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// user made
import { CreateConfirmationDto } from './dto/create-confirmation.dto';
import { UpdateConfirmationDto } from './dto/update-confirmation.dto';
import { Confirmation } from './entities/confirmation.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ConfirmationsService {
  constructor(
    @InjectRepository(Confirmation)
    private confirmationsRepository: Repository<Confirmation>,
  ) {}

  async create(
    createConfirmationDto: CreateConfirmationDto,
  ): Promise<Confirmation> {
    const confirmation = plainToClass(Confirmation, createConfirmationDto);
    return await this.confirmationsRepository.save(confirmation);
  }

  async update(
    id: number,
    updateConfirmationDto: UpdateConfirmationDto,
  ): Promise<Confirmation> {
    const confirmation = plainToClass(Confirmation, updateConfirmationDto);
    return await this.confirmationsRepository.save(confirmation);
  }

  async updateEntity(confirmation: Confirmation): Promise<Confirmation> {
    return await this.confirmationsRepository.save(confirmation);
  }

  async getById(id: number): Promise<Confirmation> {
    return await this.confirmationsRepository.findOne({
      where: { id: id },
      relations: ['supervisor', 'reviewer'],
    });
  }
}
