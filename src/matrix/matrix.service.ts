import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatrixDto } from './dto/create-matrix.dto';
import { UpdateMatrixDto } from './dto/update-matrix.dto';
import { Matrix } from './entities/matrix.entity';
import { CourseService } from 'src/course/course.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MatrixService {
  constructor(
    @InjectRepository(Matrix)
    private matrixRepository: Repository<Matrix>,
    private courseService: CourseService,
    private userService: UsersService,
  ) {}
  async create(createMatrixDto: CreateMatrixDto) {
    return await this.matrixRepository.save(createMatrixDto);
  }

  findAll() {
    return this.matrixRepository.find();
  }

  // async findOne(id: number) {
  //   const matrixFound = this.matrixRepository.findOne({ where: { id } });
  //   const courseInfo = this.courseService.searchById(
  //     (await matrixFound).courseId,
  //   );
  //   return {
  //     id: id,
  //     courseName: (await courseInfo).name,
  //     classes: (await matrixFound).classes,
  //     objectives: (await matrixFound).objectives,
  //   };
  // }

  update(id: number, updateMatrixDto: UpdateMatrixDto) {
    return `This action updates a #${id} matrix`;
  }

  remove(id: number) {
    return `This action removes a #${id} matrix`;
  }
}
