import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/constants/user-role.constant';
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
  username: string;
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
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch === true) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      username: user.username,
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
