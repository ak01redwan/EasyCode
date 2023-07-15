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
    let user = await this.usersService.findByUsername(username);
    if (!user) {
      user = await this.usersService.findByUserEmail(username);
    }
    if (!user || !(await this.bcryptService.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const { id, ...userWithoutId } = user;
    return {
      user: userWithoutId,
      access_token: await this.getUserTokens(user),
    };
  }

  async getUserTokens(user) {
    const payload = { user: user, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
