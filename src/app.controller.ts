import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './users/constants/auth.constant';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
