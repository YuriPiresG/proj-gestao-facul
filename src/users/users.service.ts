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
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log(hashedPassword);
    const userWithSameEmail = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userWithSameEmail !== null) {
      throw new ConflictException('Email already exists');
    }
    createUserDto.password = hashedPassword;
    return await this.usersRepository.save(createUserDto);
  }

  async findByName(name: string): Promise<User> {
    return this.usersRepository.findOne({ where: { name } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
