import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserRole } from '../constants/user-role.constant';
import { Professor } from 'src/professor/entities/professor.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @OneToOne(() => Professor, (professor) => professor.user)
  professor: Professor;
}

// @Column({ nullable: true })
// deletedAt: Date;
