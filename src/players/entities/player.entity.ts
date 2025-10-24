import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity'; // ← Ruta CORRECTA

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  position: string;

  @ManyToOne(() => Team, team => team.players)
  team: Team;

  @Column()
  imageUrl: string;

  // Estadísticas (0-100)
  @Column({ type: 'int', default: 70 })
  dribbling: number;

  @Column({ type: 'int', default: 70 })
  speed: number;

  @Column({ type: 'int', default: 70 })
  dribble: number;

  @Column({ type: 'int', default: 70 })
  shooting: number;

  @Column({ type: 'int', default: 70 })
  passing: number;

  @Column({ type: 'int', default: 70 })
  defense: number;

  @Column({ type: 'int', default: 70 })
  physical: number;
}