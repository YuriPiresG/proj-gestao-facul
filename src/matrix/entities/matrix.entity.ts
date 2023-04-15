import { Course } from 'src/course/entities/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Matrix {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.matrices)
  courseId: Course;

  @Column('simple-array')
  classes: string[];

  @Column('simple-array')
  skills: string[];
}
