import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../users/constants/user-role.constant';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserRole.DIRECTOR, UserRole.ADMIN)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get('cards')
  cardCourseHomePage() {
    return this.courseService.cardCourseHomePage();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findById({ id: +id });
  }

  @Put(':id')
  @Roles(UserRole.DIRECTOR, UserRole.ADMIN)
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(UserRole.DIRECTOR, UserRole.ADMIN)
  remove(@Param('id') id: number) {
    // TODO: Mudar isso para um http 204 No content
    return this.courseService.remove(id);
  }
}
