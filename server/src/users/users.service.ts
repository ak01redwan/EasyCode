import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/auth/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private bcryptService: BcryptService,
  ) {}

  async create(user: User): Promise<User> {
    if ( // checking if the user exist or not
      await this.usersRepository.findOne({ where: { email: user.email}}) ||
      await this.usersRepository.findOne({ where: { username: user.username}})
    ) {
      throw new HttpException('User with this email or username already exists!.', HttpStatus.BAD_REQUEST);
    }
    user.password = await this.bcryptService.hash(user.password, 10);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ where: { isDeleted: false}});
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id: id, isDeleted: false}});
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username: username, isDeleted: false}});
  }

  async findByUserEmail (email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: email, isDeleted: false}});
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id: id}});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.update(id, { isDeleted: true });
  }
}