import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class userData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  title: string;

  @Column()
  password: string;
  
}