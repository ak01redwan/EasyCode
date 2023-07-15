import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Subscription])],
  controllers: [MessagesController],
  providers: [MessagesService, SubscriptionsService],
})
export class MessagesModule {}
