import {
  ConflictException,
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ProfessorService } from 'src/professor/professor.service';

interface FindOneOptions {
  id?: number;
  username?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => ProfessorService))
    private professorService: ProfessorService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userWithSameEmail = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userWithSameEmail !== null) {
      throw new ConflictException('Email already exists');
    }
    const hashPass = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPass;
    return await this.usersRepository.save(createUserDto);
  }

  async findByUsername(username: string): Promise<User> {
    return this.findOne({ username });
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne({ id, username }: FindOneOptions): Promise<User> {
    const userValue = await this.usersRepository.findOne({
      where: { id, username },
    });
    if (userValue === null) {
      throw new NotFoundException('User not found');
    }
    return userValue;
  }

  // TODO: Ver com o Melo, está dando erro de Unique. Não está dando replace no banco de dados.
  async update(id: number, updateUserDto: UpdateUserDto) {
    const userWithSameEmail = await this.usersRepository.findOneBy({
      email: updateUserDto.email,
    });

    if (userWithSameEmail !== null) {
      throw new ConflictException('Email already exists');
    }
    const hashPass = await bcrypt.hash(updateUserDto.password, 10);
    updateUserDto.password = hashPass;
    return await this.usersRepository.update(id, updateUserDto);
  }

  //TODO Ver com o Melo como evitar uma circular dependency entre User e Professor. Pois o professorService tem um usersService e o usersService tem um professorService.
  async remove(id: number) {
    const professorFound = await this.professorService.findByUserId(id);
    if (professorFound !== null) {
      await this.professorService.remove(professorFound.id);
    }
    return this.usersRepository.delete(id);
  }
}
