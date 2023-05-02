import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CalendarDay } from '../../calendar-day/entities/calendar-day.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CalendarDay, (calendarDay) => calendarDay.subject)
  calendarDays: CalendarDay[];
}
