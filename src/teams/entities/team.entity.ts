import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Confederation } from './confederation.entity';
import { Player } from '../../players/entities/player.entity'; // ← Ruta CORRECTA

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  nickname: string;

  @ManyToOne(() => Confederation, confederation => confederation.teams)
  confederation: Confederation;

  @Column({ default: 0 })
  worldCupTitles: number;

  @Column()
  flagImageUrl: string;

  @OneToMany(() => Player, player => player.team)
  players: Player[];
}