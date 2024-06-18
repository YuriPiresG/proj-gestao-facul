import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../users/constants/user-role.constant';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
  async create(createProfessorDto: CreateProfessorDto) {
    const userFound = await this.usersService.findOne({
      id: createProfessorDto.userId,
    });

    const professor = new Professor();
    professor.user = userFound;
    await this.usersService.update(createProfessorDto.userId, {
      role: UserRole.PROFESSOR,
    });

    professor.periods = createProfessorDto.periods;

    return await this.professorRepository.save(professor);
  }
  findAll() {
    return this.professorRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.professorRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async findByUserId(userId: number): Promise<Professor | null> {
    return this.professorRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    const professorUpdated = this.professorRepository.save({
      id,
      periods: updateProfessorDto.periods,
    });
    return professorUpdated;
  }

  remove(id: number) {
    this.professorRepository.delete(id);
    return `Professor #${id} was successfully deleted`;
  }
}
