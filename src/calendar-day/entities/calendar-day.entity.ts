import { Calendar } from 'src/calendar/entities/calendar.entity';
import { Periods } from 'src/course/constants/period.constant';
import { Professor } from 'src/professor/entities/professor.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayOfTheWeek } from '../constants/dayOfTheWeek.constant';
@Entity()
export class CalendarDay {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  dayOfTheWeek: DayOfTheWeek;
  @ManyToOne(() => Calendar, (calendar) => calendar.calendarDays)
  calendar: Calendar;
  @ManyToOne(() => Subject, (subject) => subject.calendarDays)
  @JoinColumn()
  subject: Subject;
  @Column('simple-array')
  period: Periods[];

  @ManyToMany(() => Professor)
  @JoinTable()
  professor: Professor[];
}
