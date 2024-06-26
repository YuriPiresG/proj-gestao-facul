import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UsersService } from '../users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserRole } from '../users/constants/user-role.constant';
import { MatrixService } from '../matrix/matrix.service';

interface FindOneOptions {
  id?: number;
  username?: string;
}

@Injectable()
export class CourseService {
  constructor(
    @Inject(forwardRef(() => MatrixService))
    private matrixService: MatrixService,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private userService: UsersService,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const userCoordinator = await this.userService.findOne({
      id: createCourseDto.coordinatorId,
    });
    if (
      userCoordinator.role !== UserRole.ADMIN &&
      userCoordinator.role !== UserRole.COORDINATOR
    ) {
      throw new ForbiddenException('User is not a coordinator or Admin');
    }
    return await this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return this.courseRepository.find({ relations: ['coordinatorId'] });
  }

  async cardCourseHomePage() {
    const course = await this.courseRepository
      .createQueryBuilder()
      .select('count(*)')
      .getCount();
    const card = {
      course,
    };
    return card;
  }

  async findById({ id }: FindOneOptions) {
    return await this.courseRepository.findOne({
      where: { id },
      relations: ['coordinatorId', 'matrices', 'matrices.subjects'],
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const isCoordinator = await this.userService.findOne({
      id: updateCourseDto.coordinatorId,
    });
    if (
      isCoordinator.role !== UserRole.ADMIN &&
      isCoordinator.role !== UserRole.COORDINATOR
    ) {
      throw new ForbiddenException('User is not a coordinator or Admin');
    }
    return this.courseRepository.save({ ...updateCourseDto, id });
  }

  async remove(id: number) {
    const matrixFound = await this.matrixService.findOneByCourseId(id);
    if (matrixFound !== null) {
      await this.matrixService.remove(matrixFound.id);
    }
    return this.courseRepository.delete(id);
  }
}
