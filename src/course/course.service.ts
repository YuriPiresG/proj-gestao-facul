import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UsersService } from 'src/users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MatrixService } from 'src/matrix/matrix.service';

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

  async searchById(id: number) {
    return await this.courseRepository.findOne({ where: { id } });
  }

  async findById(id: number) {
    const foundCourse = await this.courseRepository.findOne({ where: { id } });
    const coordInfo = await this.userService.findOne(foundCourse.coordinatorId);
    // Ver com o melo, eu sei que não é assim que se faz, porém foi o único jeito que consegui deixar bonito
    const courseCoordRelation = {
      id: id,
      name: foundCourse.name,
      coordinator: coordInfo.name,
      durationHours: foundCourse.durationHours,
      quantityClass: foundCourse.quantityClass,
      quantitySemester: foundCourse.quantitySemester,
      periods: foundCourse.periods,
    };
    return courseCoordRelation;
  }

  // Ta retornando a promisse, ao invés da DTO
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const isCoordinator = await this.userService.findOne(
      updateCourseDto.coordinatorId,
    );
    if (isCoordinator.role !== 0 && isCoordinator.role !== 2) {
      throw new ForbiddenException('User is not a coordinator or Admin');
    }
    return await this.courseRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepository.delete(id);
  }
}
