import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export function createUserDtoToUserEntity(dto: CreateUserDto): User {
  const { name, email, password } = dto;
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  return user;
}
export function updateUserDtoToUserEntity(dto: UpdateUserDto): User {
  const { id, name, email, password } = dto;
  const user = new User();
  user.id = id;
  user.name = name;
  user.email = email;
  user.password = password;
  return user;
}