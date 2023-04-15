import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Periods } from '../constants/period.constant';
import { Matrix } from 'src/matrix/entities/matrix.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  //TODO: Relacionamento OneToMany TYPEORM, pesquisar
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

  @OneToMany(() => Matrix, (matrix) => matrix.courseId)
  matrices: Matrix[];
}
