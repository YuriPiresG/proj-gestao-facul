import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

//TODO: Rename Class to something else
@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
