import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    SubscriptionsModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
