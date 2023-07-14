import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, Put, BadRequestException, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import * as fs from 'fs';


// coder made
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserDtoToUserEntity, updateUserDtoToUserEntity } from './mappers/user.mappers';
import { UploadFileToDiskStorage } from 'src/helpers/upload-file'
import { ConfirmationsService } from 'src/confirmations/confirmations.service';
import { CreateConfirmationDto } from 'src/confirmations/dto/create-confirmation.dto';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly confirmationsService: ConfirmationsService
    ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 2, UploadFileToDiskStorage),
  )
  async create(@Body() createUserDto: CreateUserDto, @UploadedFiles() files: Multer.File[]): Promise<any> {
    const [photo, certificationsDocs] = files;
    // set user files path
    createUserDto.picturePath = photo ? `/uploads/${photo.filename}` : '/path/to/default/photo';
    createUserDto.certificationsDocsPath = certificationsDocs ? `/uploads/${certificationsDocs.filename}` : '';
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
      // link it with confirmation object if it is supervisor
      if (userWithTokens.user.userType == 'supervisor') {
        // get the admin to be the default reviewer for this new supervisor certification documents
        const admin: User = await this.usersService.findAllByType('admin')[0];
        // create confirmation dto object for validation
        const confirmation: CreateConfirmationDto = {
          isConfirmed: false, // set it by default on false until the reviewer change it
          reviewerComment: 'Acceptable.', // in case the reviewer didn't have the time to comment
          supervisor: userWithTokens.user,// the new supervisor
          reviewer: admin// the default reviewer
        };
        // create the confirmation object for this new supervisor
        await this.confirmationsService.create(confirmation);
      }
      // everything is done just return the result
      return userWithTokens;
    } catch (err) {
      if (photo) {
        try {
          fs.unlinkSync(photo.path);
          if (certificationsDocs) {
            fs.unlinkSync(certificationsDocs.path);
          }
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