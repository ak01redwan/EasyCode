import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserDtoToUserEntity, updateUserDtoToUserEntity } from './mappers/user.mappers';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    // converting createUsetDto to User type
    const user = createUserDtoToUserEntity(createUserDto);
    // creating new datatype to use it inside this function
    type UserWithTokens = {
      user: User;
      tokens: string;
    };
    // put everything inside try catch if there is an error
    try {
      const userWithTokens: UserWithTokens = {
        user: await this.usersService.create(user),
        tokens: await this.authService.getUserTokens(user)
      };
      return userWithTokens;
    } catch (error) {
      if (error.number == '2627') { // 2627 sql error for the unique error
        throw new HttpException(`User with this email and username already exists!.`, HttpStatus.CONFLICT);
      } // for the others errors
      throw new HttpException(`Internal server error ==== Error Details: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return await this.usersService.findOne(params.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = updateUserDtoToUserEntity(updateUserDto);
    return await this.usersService.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(+id);
  }
}