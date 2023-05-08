
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findByUsername(username);
    console.log(user);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.getUserTokens(user),
    };
  }

  async getUserTokens (user) {
    const payload = { username: user.username, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
