import { CalendarDay } from 'src/calendar-day/entities/calendar-day.entity';
import { Course } from 'src/course/entities/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => CalendarDay, (calendarDay) => calendarDay.calendar)
  calendarDays: CalendarDay[];
}
