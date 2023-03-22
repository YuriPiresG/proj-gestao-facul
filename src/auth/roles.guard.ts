import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/users/constants/user-role.constant';
import { UserJwtPayload } from 'src/auth/jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const user: UserJwtPayload = context.switchToHttp().getRequest().user;
    console.log(user);
    if (!user || !user.role) {
      return false;
    }
    // return requiredRoles.some((role) => user.role.includes(role));
  }
}
