import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Stage } from 'src/stages/entities/stage.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>
  ) {}

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
      relations: ['user', 'course','stage'],
    });
  }

  async findById(id: number): Promise<Subscription> {
    return this.subscriptionsRepository.findOne({
        where: { id },
        relations: ['user', 'course','stage'],
    });
  }

  async findByUser(userId: number): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'course','stage'],
    });
  }

  async findByCourse(courseId: number): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
        where: { course: { id: courseId } },
        relations: ['user', 'course','stage'],
    });
  }

  async findByUserAndCourse(courseId: number, userId: number): Promise<Subscription>{
    return this.subscriptionsRepository.findOne({
      where: { course: { id: courseId }, user: { id: userId}},
      relations: ['stage','user', 'course']
    });
  }

  async create(subscription: Subscription): Promise<Subscription> {
    return this.subscriptionsRepository.save(subscription);
  }

  async update(id: number, subscription: Subscription): Promise<Subscription> {
    await this.subscriptionsRepository.update(id, subscription);
   return this.findById(id);
  }

  async delete(id: number): Promise<any> {
    await this.subscriptionsRepository.delete(id);
    return {message: 'deleted'};
  }

  async getCurrentStage(subscriptionId: number): Promise<Stage> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id: subscriptionId },
      relations: ['stage'],
    });
    
    if (!subscription) {
      throw new Error(`Subscription with id ${subscriptionId} not found`);
    }

    return subscription.stage;
  }
}