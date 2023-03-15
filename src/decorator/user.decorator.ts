import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('Request:', request);
    console.log('User:', request.user);
    return request.user;
  },
);
