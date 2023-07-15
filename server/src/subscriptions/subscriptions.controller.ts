import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Subscription> {
    return await this.subscriptionsService.findById(id);
  }

  @Get('by-user/:userId')
  async findByUser(@Param('userId') userId: number): Promise<Subscription[]> {
    return await this.subscriptionsService.findByUser(userId);
  }

  @Get('by-user/:userId/by-course/:courseId')
  async findByUserAndCourse(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number,
  ): Promise<Subscription> {
    return await this.subscriptionsService.findByUserAndCourse(
      userId,
      courseId,
    );
  }

  @Get('by-course/:courseId')
  async findByCourse(
    @Param('courseId') courseId: number,
  ): Promise<Subscription[]> {
    return await this.subscriptionsService.findByCourse(courseId);
  }

  @Post()
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = plainToClass(Subscription, createSubscriptionDto);
    const errors = await validate(subscription);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    return await this.subscriptionsService.create(subscription);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = plainToClass(Subscription, updateSubscriptionDto);
    const errors = await validate(subscription);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    return await this.subscriptionsService.update(id, subscription);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.subscriptionsService.delete(id);
  }
}
