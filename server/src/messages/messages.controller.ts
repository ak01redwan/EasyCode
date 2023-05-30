import { Controller, Get, Post, Param, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async howMany(): Promise<any> {
    return {inf: 'there is '+this.messagesService.howMany()+' messages'};
  }


  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const user: User = req.user;
    await this.messagesService.remove(id, user);
  }
}
