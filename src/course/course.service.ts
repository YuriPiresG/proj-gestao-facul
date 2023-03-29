import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UsersService } from 'src/users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private userService: UsersService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const isCoordinator = await this.userService.findOne(
      createCourseDto.coordinatorId,
    );
    if (isCoordinator.role !== 0 && isCoordinator.role !== 2) {
      throw new ForbiddenException('User is not a coordinator or Admin');
    }
    return await this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return this.courseRepository.find();
  }

  async findById(id: number) {
    const foundCourse = this.courseRepository.findOne({ where: { id } });
    const coordInfo = this.userService.findOne(
      (await foundCourse).coordinatorId,
    );
    // Ver com o melo, eu sei que não é assim que se faz
    const courseCoordRelation = {
      id: id,
      name: (await foundCourse).name,
      coordinator: (await coordInfo).name,
      durationHours: (await foundCourse).durationHours,
      quantityClass: (await foundCourse).quantityClass,
      quantitySemester: (await foundCourse).quantitySemester,
    };
    return courseCoordRelation;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
