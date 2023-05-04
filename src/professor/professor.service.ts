import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
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
    if (userFound.role !== 3) {
      throw new BadRequestException('User is not a professor');
    }
    const professor = new Professor();
    professor.user = userFound;
    professor.periods = createProfessorDto.periods;

    return await this.professorRepository.save(professor);
    //TODO ver com o Melo pq o codigo abaixo salvava user como NUll antes
    // return await this.professorRepository.save({
    //   userId: createProfessorDto.userId,
    //   periods: createProfessorDto.periods,
    // });
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
