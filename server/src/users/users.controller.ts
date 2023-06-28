import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, Put, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
// coder made
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserDtoToUserEntity, updateUserDtoToUserEntity } from './mappers/user.mappers';
import { UploadFileToDiskStorage } from 'src/helpers/upload-file'


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', UploadFileToDiskStorage))
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() photo): Promise<any> {
    // set user photo path
    createUserDto.picturePath = photo ? `/public/uploads/${photo.filename}` : '/path/to/default/photo';
    // converting createUsetDto to User type
    const user = createUserDtoToUserEntity(createUserDto);
    // creating new datatype to use it inside this function
    type UserWithTokens = {
      user: User;
      tokens: string;
    };
    
    try {
      const userWithTokens: UserWithTokens = {
        user: await this.usersService.create(user),
        tokens: await this.authService.getUserTokens(user)
      };
      return userWithTokens;
    } catch (err) {
      console.log(photo.path);
      if (photo) {
        try {
          fs.unlinkSync(photo.path);
          console.log('File deleted successfully');
        } catch (error) {
          console.log('faild to deleted the file');
        }
      }
      throw err;
    }
  }

  // for admin
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // for admin
  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return await this.usersService.findOne(params.id);
  }

  // for admin or the account owner
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = updateUserDtoToUserEntity(updateUserDto);
    return await this.usersService.update(+id, user);
  }

  // for admin or the account owner
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(+id);
  }
}