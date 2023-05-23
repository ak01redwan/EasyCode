import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { LikeDto } from './dto/like.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async toggleLikeCourse(likeDto: LikeDto): Promise<any> {
    let like = await this.likeRepository.findOne({
      where: { user: { id: likeDto.user.id }, course: { id: likeDto.course.id }},
    });
    if (like) { // unlike the course if it is exist
      await this.likeRepository.remove(like)
      return {message: "course's like has been removed", like:like};
    } else {
      const newLike = plainToClass(Like, likeDto)
      like = await this.likeRepository.save(newLike);
      return {message: "course's like added", like};
    }
  }

  async projectLikeAndUnlike(likeDto: LikeDto, id: number): Promise<Like> {
    const like = await this.likeRepository.findOne({
      where: { user: likeDto.user, id: id },
    });
    like.course = likeDto.course;
    return await this.likeRepository.save(like);
  }

  async getAll(): Promise<Like[]> {
    return await this.likeRepository.find({ relations: ['user', 'course'] });
  }

}