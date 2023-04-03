import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatrixDto } from './dto/create-matrix.dto';
import { UpdateMatrixDto } from './dto/update-matrix.dto';
import { Matrix } from './entities/matrix.entity';

@Injectable()
export class MatrixService {
  constructor(
    @InjectRepository(Matrix)
    private matrixRepository: Repository<Matrix>,
  ) {}
  create(createMatrixDto: CreateMatrixDto) {
    return this.matrixRepository.save(createMatrixDto);
  }

  findAll() {
    return `This action returns all matrix`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matrix`;
  }

  update(id: number, updateMatrixDto: UpdateMatrixDto) {
    return `This action updates a #${id} matrix`;
  }

  remove(id: number) {
    return `This action removes a #${id} matrix`;
  }
}
