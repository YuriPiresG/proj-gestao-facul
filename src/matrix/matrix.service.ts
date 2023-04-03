import { Injectable } from '@nestjs/common';
import { CreateMatrixDto } from './dto/create-matrix.dto';
import { UpdateMatrixDto } from './dto/update-matrix.dto';

@Injectable()
export class MatrixService {
  create(createMatrixDto: CreateMatrixDto) {
    return 'This action adds a new matrix';
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
