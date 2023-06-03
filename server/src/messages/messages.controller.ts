import { Controller, Get, Post, Param, Body, Delete, UseGuards, Req, NotAcceptableException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly subscriptionsService: SubscriptionsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    const subscription = await this.subscriptionsService.findByUserAndCourse(
      createMessageDto.course.id,
      createMessageDto.sender.id
      );
    //console.log(subscription);
    if (subscription)
      return this.messagesService.create(createMessageDto);
    else
      throw new NotAcceptableException('subscription not found!.');
  }

  @Get('/get-user-msgs')
  async getUserMessagesBasedOn(@Body() info: { userId: number, courseId: number}): Promise<Message[]>{
    const subscription = await this.subscriptionsService.findByUserAndCourse(info.courseId, info.userId);
    if (subscription)
      return this.messagesService.getByCourse(subscription.course)
    else
      throw new NotAcceptableException('subscription not found!.');
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async howMany(): Promise<any> {
    return {inf: 'there is '+await this.messagesService.howMany()+' messages'};
  }


  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const user: User = req.user;
    await this.messagesService.remove(id, user);
  }
}
