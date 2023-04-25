import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatrixDto } from './dto/create-matrix.dto';
import { UpdateMatrixDto } from './dto/update-matrix.dto';
import { Matrix } from './entities/matrix.entity';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class MatrixService {
  constructor(
    @InjectRepository(Matrix)
    private matrixRepository: Repository<Matrix>,
    private courseService: CourseService,
  ) {}
  async create(createMatrixDto: CreateMatrixDto) {
    const courseFound = await this.courseService.findById(
      createMatrixDto.courseId,
    );
    if (createMatrixDto.semester > courseFound.quantitySemester) {
      throw new BadRequestException(
        `Semester is greater than ${courseFound.quantitySemester}`,
      );
    }
    const semesterFound = await this.matrixRepository.findOne({});
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

  async findOne(id: number) {
    return this.matrixRepository.findOne({
      where: { id },
      relations: ['course'],
    });
  }

  update(id: number, updateMatrixDto: UpdateMatrixDto) {
    // return this.matrixRepository.save({ id, ...updateMatrixDto });
  }

  remove(id: number) {
    return `This action removes a #${id} matrix`;
  }
}
