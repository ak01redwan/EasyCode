import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export const createUserDtoToUserEntity = (
  createUserDto: CreateUserDto,
): User => {
  const user = new User();
  user.signupDate = new Date();
  user.birthDate = createUserDto.birthDate;
  user.address = createUserDto.address;
  user.email = createUserDto.email;
  user.username = createUserDto.username;
  user.userType = createUserDto.userType;
  user.picturePath = createUserDto.picturePath;
  user.fullName = createUserDto.fullName;
  user.password = createUserDto.password;
  user.userDescription = createUserDto.userDescription;
  user.currentCourseId = createUserDto.currentCourseId;
  return user;
};

export const updateUserDtoToUserEntity = (
  updateUserDto: UpdateUserDto,
): User => {
  const user = new User();
  user.id = updateUserDto.id;
  user.birthDate = updateUserDto.birthDate;
  user.address = updateUserDto.address;
  user.email = updateUserDto.email;
  user.username = updateUserDto.username;
  user.userType = updateUserDto.userType;
  user.picturePath = updateUserDto.picturePath;
  user.fullName = updateUserDto.fullName;
  user.password = updateUserDto.password;
  user.userDescription = updateUserDto.userDescription;
  user.currentCourseId = updateUserDto.currentCourseId;
  user.isDeleted = updateUserDto.isDeleted;
  return user;
};
