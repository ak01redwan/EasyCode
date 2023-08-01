import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  UseGuards,
  Req,
  NotAcceptableException,
  Request,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    if (req.authData.user.id != createMessageDto.sender.id) {
      throw new NotAcceptableException(
        'you can not send by other one identity.!',
      );
    }
    const subscription = await this.subscriptionsService.findByUserAndCourse(
      createMessageDto.course.id,
      createMessageDto.sender.id,
    );
    //console.log(subscription);
    if (subscription) return this.messagesService.create(createMessageDto);
    else throw new NotAcceptableException('subscription not found!.');
  }

  @UseGuards(AuthGuard)
  @Post('/get-user-msgs')
  async getUserMessagesBasedOn(
    @Request() req,
    @Body() info: { courseId: number },
  ): Promise<Message[]> {
    const subscription = await this.subscriptionsService.findByUserAndCourse(
      info.courseId,
      req.authData.user.id,
    );
    if (subscription)
      return this.messagesService.getByCourse(subscription.course);
    else throw new NotAcceptableException('subscription not found!.');
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async howMany(): Promise<any> {
    return {
      inf: 'there is ' + (await this.messagesService.howMany()) + ' messages',
    };
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const user: User = req.user;
    await this.messagesService.remove(id, user);
  }
}
