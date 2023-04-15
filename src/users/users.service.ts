import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
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
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
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

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
