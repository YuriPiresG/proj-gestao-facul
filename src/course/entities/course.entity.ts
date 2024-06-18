import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Periods } from '../constants/period.constant';
import { Matrix } from '../../matrix/entities/matrix.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.id)
  @Column()
  coordinatorId: number;

  @Column()
  durationHours: number;

  @Column()
  quantityClass: number;

  @Column()
  quantitySemester: number;

  @Column('simple-array')
  periods: Periods[];

  @OneToMany(() => Matrix, (matrix) => matrix.course)
  matrices: Matrix[];
}
