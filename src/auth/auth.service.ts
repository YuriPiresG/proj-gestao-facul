import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/constants/user-role.constant';

export interface JwtPayload {
  name: string;
  sub: number;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByName(username);
    if (user.password === pass && user.name === username) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      name: user.name,
      sub: user.id,
      role: user.role,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
