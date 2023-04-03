import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Periods } from '../constants/period.constant';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

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
}
