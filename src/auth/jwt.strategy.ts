import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayload } from './auth.service';
import { UserRole } from 'src/users/constants/user-role.constant';

export interface UserJwtPayload {
  userId: number;
  username: string;
  name: string;
  role: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserJwtPayload> {
    return {
      userId: payload.sub,
      username: payload.username,
      name: payload.name,
      role: payload.role,
    };
  }
}
