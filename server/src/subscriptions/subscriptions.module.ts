import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription,Course])
  ],
  controllers: [SubscriptionsController],
<<<<<<< HEAD
  providers: [SubscriptionsService],
=======
  providers: [SubscriptionsService, CoursesService]
>>>>>>> main
})
export class SubscriptionsModule {}
