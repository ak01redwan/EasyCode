import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeDto } from './dto/like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/course/:id')
  courseLikeAndUnlike(@Body() likeDto: LikeDto, @Param('id') id: string) {
    console.log(likeDto);
    console.log(id);
    return this.likesService.courseLikeAndUnlike(likeDto, +id);
  }

  @Post('/project/:id')
  projectLikeAndUnlike(@Body() likeDto: LikeDto, @Param('id') id: string) {
    return this.likesService.projectLikeAndUnlike(likeDto, +id);
  }

  @Get()
  gatAll () {
    return this.likesService.getAll();
  }
}
