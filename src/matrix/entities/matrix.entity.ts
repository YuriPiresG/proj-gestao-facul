import { Course } from 'src/course/entities/course.entity';
import { Class } from 'src/classes/entities/class.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Matrix {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.matrices)
  course: Course;

  @ManyToMany(() => Class)
  @JoinTable()
  classes: Class[];

  @Column('simple-array')
  skillsDescription: string[];

  @Column('smallint')
  semester: number;
}
