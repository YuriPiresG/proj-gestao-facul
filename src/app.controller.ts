import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/auth.decorator';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {}
