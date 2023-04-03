import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Matrix {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @Column('simple-array')
  classes: string[];

  @Column('simple-array')
  objectives: string[];
}
