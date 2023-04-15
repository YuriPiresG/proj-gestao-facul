import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UsersService } from 'src/users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MatrixService } from 'src/matrix/matrix.service';
import { UserRole } from 'src/users/constants/user-role.constant';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private userService: UsersService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const userCoordinator = await this.userService.findOne(
      createCourseDto.coordinatorId,
    );
    if (
      userCoordinator.role !== UserRole.ADMIN &&
      userCoordinator.role !== UserRole.COORDINATOR
    ) {
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

  //TODO: alterar codigo depois de implementar o relacionamento entre curso e coordenador OneToMany
  async findById(id: number) {
    const foundCourse = await this.courseRepository.findOne({ where: { id } });
    const coordInfo = await this.userService.findOne(foundCourse.coordinatorId);
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

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const isCoordinator = await this.userService.findOne(
      updateCourseDto.coordinatorId,
    );
    if (
      isCoordinator.role !== UserRole.ADMIN &&
      isCoordinator.role !== UserRole.COORDINATOR
    ) {
      throw new ForbiddenException('User is not a coordinator or Admin');
    }
    return this.courseRepository.save({ ...updateCourseDto, id });
  }

  remove(id: number) {
    return this.courseRepository.delete(id);
  }
}
