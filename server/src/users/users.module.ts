import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// user made
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ConfirmationsService } from 'src/confirmations/confirmations.service';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/auth/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ConfirmationsService, AuthService, BcryptService],
  exports: [UsersService]
})
export class UsersModule {}
