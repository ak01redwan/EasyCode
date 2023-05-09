import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  async create(category: Category): Promise<Category> {
    return await this.categoriesRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoriesRepository.findOne({ where: { id: id}});
  }

  async update(id: number, category: Category): Promise<Category> {
    const existingCategory = await this.categoriesRepository.findOne({ where: { id: id}});
    if (!existingCategory) {
      throw new HttpException(`Category with ID '${id}' not found.`, HttpStatus.NOT_FOUND);
    }
    existingCategory.name = category.name;
    return await this.categoriesRepository.save(existingCategory);
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}