import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(Status)
    private readonly statusesRepository: Repository<Status>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = plainToClass(Notification, createNotificationDto);
    const savedNotification = await this.notificationsRepository.save(newNotification);
    return await this.findOne(savedNotification.id);
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationsRepository.find({
      relations: ['statuses']
    });
  }

  async findOne(id: number): Promise<Notification> {
    return await this.notificationsRepository.findOne({
      where: { id: id},
      relations: ['statuses']
    });
  }

  async getUsersNotifications(userId: number): Promise<Notification[]> {
    return (await this.notificationsRepository.find({
      relations: ['statuses', 'statuses.user']
    })).filter((notification: Notification) => {
      return !notification.statuses.find((status: Status) => {
        return status.user.id == userId
      });
    });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
