import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../constants/user-role.constant';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
