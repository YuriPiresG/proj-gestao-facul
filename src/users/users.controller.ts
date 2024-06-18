import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDec } from '../decorator/user.decorator';
import { UserJwtPayload } from '../auth/jwt.strategy';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from './constants/user-role.constant';
import { Public } from '../decorator/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@UserDec() user: UserJwtPayload) {
    return user;
  }

  @Post()
  @Public()
  // @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('cards')
  cardsHomePage() {
    return this.usersService.cardsHomePage();
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<User> {
    return this.usersService.findByUsername(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
