import { Course } from 'src/course/entities/course.entity';
import { Subject } from 'src/subject/entities/subject.entity';
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

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  @Column('simple-array')
  skillsDescription: string[];

  @Column('smallint')
  semester: number;
}
