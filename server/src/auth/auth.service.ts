
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findByUsername(username);
    if (!user || await this.bcryptService.compare(user.password, pass)) {
      throw new UnauthorizedException();
    }
    const { id, ...userWithoutId} = user;
    return {
      user: userWithoutId,
      access_token: await this.getUserTokens(user),
    };
  }

  async getUserTokens (user) {
    const payload = { username: user.username, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
