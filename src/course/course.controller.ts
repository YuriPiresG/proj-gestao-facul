import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/users/constants/user-role.constant';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserRole.COORDINATOR, UserRole.ADMIN)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseService.findById(+id);
  }

  @Put(':id')
  @Roles(UserRole.COORDINATOR, UserRole.ADMIN)
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(UserRole.COORDINATOR, UserRole.ADMIN)
  remove(@Param('id') id: number) {
    // Mudar isso para um http 204 No content
    return 'Course deleted';
  }
}
