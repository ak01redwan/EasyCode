import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async courseLikeAndUnlike(likeDto: LikeDto, id: number): Promise<Like> {
    const like = await this.likeRepository.findOne({
      where: { user: likeDto.user, id: id },
    });
    if (like){
      like.course = likeDto.course;
      return await this.likeRepository.save(like);
    }
    const newLike = new Like();
    newLike.course = likeDto.course;
    newLike.user = likeDto.user;
    return await this.likeRepository.save(newLike);
  }

  async projectLikeAndUnlike(likeDto: LikeDto, id: number): Promise<Like> {
    const like = await this.likeRepository.findOne({
      where: { user: likeDto.user, id: id },
    });
    like.course = likeDto.course;
    return await this.likeRepository.save(like);
  }

  async getAll(): Promise<Like[]> {
    return await this.likeRepository.find();
  }

}