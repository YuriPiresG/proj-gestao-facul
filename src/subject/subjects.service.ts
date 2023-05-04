import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}
  create(createSubjectDto: CreateSubjectDto) {
    return this.subjectRepository.save(createSubjectDto);
  }

  findAll() {
    return this.subjectRepository.find();
  }

  findOne(id: number) {
    return this.subjectRepository.findOne({ where: { id } });
  }

  update(id: number, UpdateSubjectDto: UpdateSubjectDto) {
    return this.subjectRepository.save({ ...UpdateSubjectDto, id });
  }

  remove(id: number) {
    return this.subjectRepository.delete({ id });
  }
}
