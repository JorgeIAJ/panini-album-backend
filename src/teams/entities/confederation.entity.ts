import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class Confederation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  region: string;

  @OneToMany(() => Team, team => team.confederation)
  teams: Team[];
}