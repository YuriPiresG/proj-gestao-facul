import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { Professor } from '../professor/entities/professor.entity';
import * as bcrypt from 'bcrypt';
import { ProfessorService } from '../professor/professor.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let professorService: ProfessorService;
  let usersRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ProfessorService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            createQueryBuilder: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Professor),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    professorService = module.get<ProfessorService>(ProfessorService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw a ConflictException if email is already registered', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: '123456',
        role: 1,
        id: 1,
        username: 'testUser',
        name: 'Test User',
        professor: {} as Professor, // Mock a professor
      };
      jest
        .spyOn(usersRepository, 'findOneBy')
        .mockResolvedValueOnce(createUserDto);
      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should hash the password before saving the user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: '123456',
        role: 1,
        id: 1,
        username: 'testUser',
        name: 'Test User',
        professor: {} as Professor,
      };
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValueOnce(null);
      const bcryptSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashedPassword');
      jest
        .spyOn(usersRepository, 'save')
        .mockResolvedValue({ ...createUserDto, password: 'hashedPassword' });
      await service.create(createUserDto);
      expect(bcryptSpy).toHaveBeenCalledWith('123456', 10);
    });

    it('should call professorService.create if role is 3', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: '123456',
        role: 3,
        id: 1,
        username: 'testUser',
        name: 'Test User',
        professor: {} as Professor, // Mock a professor
      };
      const mockUser: Partial<User> = {
        id: 1,
        username: 'testUser',
        email: 'user@test.com',
      };
      const mockProfessor: Professor = {
        id: 1,
        user: mockUser as User,
        periods: [],
      };
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(usersRepository, 'save').mockResolvedValue({
        ...createUserDto,
        password: 'hashedPassword',
      });
      const professorServiceSpy = jest
        .spyOn(professorService, 'create')
        .mockResolvedValue(mockProfessor);
      await service.create(createUserDto);
      expect(professorServiceSpy).toHaveBeenCalledWith({
        userId: 1,
        periods: [],
      });
    });
  });

  // Test for findByUsername method
  describe('findByUsername', () => {
    it('should return a user for a given username', async () => {
      const user = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
      } as User;
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);
      const result = await service.findByUsername('testUser');
      expect(result).toEqual(user);
    });
  });

  // Test for findAll method
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, username: 'testUser', email: 'test@example.com' },
      ] as User[];
      jest.spyOn(usersRepository, 'find').mockResolvedValue(users);
      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  // Test for cardsHomePage method
  describe('cardsHomePage', () => {
    it('should return counts of professors and coordinators', async () => {
      jest.spyOn(usersRepository, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValueOnce(10).mockResolvedValueOnce(5),
      } as unknown as SelectQueryBuilder<User>); // Type assertion here
      const result = await service.cardsHomePage();
      expect(result).toEqual({ professor: 10, coordinator: 5 });
    });
  });

  // Test for findOne method
  describe('findOne', () => {
    it('should return a user for given id or username', async () => {
      const user = {
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
      } as User;
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);
      const result = await service.findOne({ id: 1 });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne({ id: 999 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // Test for update method

  describe('update', () => {
    it('should hash the new password before updating the user', async () => {
      const updateUserDto = { password: 'newPassword' };
      const bcryptSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashedNewPassword');
      // Mock the update method to return a value that matches the UpdateResult type
      jest.spyOn(usersRepository, 'update').mockResolvedValue({
        affected: 1,
        raw: {}, // Mock the raw property as needed for your test
        generatedMaps: [], // Mock the generatedMaps property as needed for your test
      } as UpdateResult); // Cast the object to UpdateResult to satisfy TypeScript
      await service.update(1, updateUserDto);
      expect(bcryptSpy).toHaveBeenCalledWith('newPassword', 10);
    });
  });

  it('should delete the user', async () => {
    jest.spyOn(professorService, 'findByUserId').mockResolvedValue(null);
    const deleteSpy = jest.spyOn(usersRepository, 'delete').mockResolvedValue({
      affected: 1,
      raw: [], // Assuming an empty array satisfies the 'raw' property requirement for this test
    });
    await service.remove(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
