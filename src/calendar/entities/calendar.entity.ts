import { Course } from 'src/course/entities/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Course)
  @JoinColumn()
  course: Course;

  @Column()
  semester: number;

  @Column({ default: true })
  isActive: boolean;
}
