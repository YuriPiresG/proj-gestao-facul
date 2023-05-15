import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseService } from 'src/course/course.service';
import { Repository } from 'typeorm';
import { CreateMatrixDto } from './dto/create-matrix.dto';
import { UpdateMatrixDto } from './dto/update-matrix.dto';
import { Matrix } from './entities/matrix.entity';

@Injectable()
export class MatrixService {
  constructor(
    @InjectRepository(Matrix)
    private matrixRepository: Repository<Matrix>,
    @Inject(forwardRef(() => CourseService))
    private courseService: CourseService,
  ) {}
  async create(createMatrixDto: CreateMatrixDto) {
    const courseFound = await this.courseService.findById({
      id: createMatrixDto.courseId,
    });
    if (!courseFound) {
      throw new BadRequestException(
        `Course ${createMatrixDto.courseId} not found`,
      );
    }
    if (createMatrixDto.semester > courseFound.quantitySemester) {
      throw new BadRequestException(
        `Semester is greater than ${courseFound.quantitySemester}`,
      );
    }
    if (
      courseFound.matrices.find((m) => m.semester === createMatrixDto.semester)
    ) {
      throw new BadRequestException(
        `Semester ${createMatrixDto.semester} already exists in ${courseFound.name}}`,
      );
    }
    return await this.matrixRepository.save({
      skillsDescription: createMatrixDto.skillsDescription,
      course: { id: createMatrixDto.courseId },
      subjects: createMatrixDto.subjects.map((id) => ({ id })),
      semester: createMatrixDto.semester,
    });
  }

  findAll() {
    return this.matrixRepository.find({ relations: ['subjects'] });
  }

  async findOne(id: number, courseId?: number) {
    return this.matrixRepository.findOne({
      where: { id },
      relations: ['course', 'subjects'],
    });
  }
  async findOneByCourseId(courseId: number) {
    return this.matrixRepository.findOne({
      where: { course: { id: courseId } },
    });
  }

  //TODO Não deixar uma matriz com dois semestres iguais
  async update(id: number, updateMatrixDto: UpdateMatrixDto) {
    const course = updateMatrixDto.courseId
      ? { id: updateMatrixDto.courseId }
      : undefined;

    const matrixUpdated = await this.matrixRepository.save({
      course,
      id,
      semester: updateMatrixDto.semester,
      skillsDescription: updateMatrixDto.skillsDescription,
      subjects: updateMatrixDto.subjects?.map((id) => ({ id })),
    });
    return matrixUpdated;
  }

  remove(id: number) {
    return this.matrixRepository.delete(id);
  }
}
