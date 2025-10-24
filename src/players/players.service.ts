import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  // Obtener todos los jugadores
  async findAll(): Promise<Player[]> {
    return this.playersRepository.find({
      relations: ['team'],
    });
  }

  // Obtener un jugador por ID
  async findOne(id: number): Promise<Player> {
    const player = await this.playersRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  // Obtener jugadores por equipo
  async findByTeam(teamId: number): Promise<Player[]> {
    return this.playersRepository.find({
      where: { team: { id: teamId } },
      relations: ['team'],
    });
  }

  // Crear jugadores de ejemplo - VERSIÓN CORREGIDA
  async seedPlayers() {
    // Obtener equipos existentes de forma más segura
    const teams = await this.teamsRepository.find();
    
    if (teams.length === 0) {
      throw new NotFoundException('No teams found. Please seed teams first.');
    }

    const argentina = teams.find(team => team.country === 'Argentina');
    const brasil = teams.find(team => team.country === 'Brasil');

    if (!argentina || !brasil) {
      throw new NotFoundException('Required teams not found');
    }

    // Crear jugadores de ejemplo
    const players = await this.playersRepository.save([
      {
        name: 'Lionel Messi',
        age: 36,
        position: 'Delantero',
        team: argentina,
        imageUrl: 'https://example.com/messi.jpg',
        dribbling: 95,
        speed: 85,
        dribble: 97,
        shooting: 92,
        passing: 91,
        defense: 38,
        physical: 65,
      },
      {
        name: 'Neymar Jr',
        age: 31,
        position: 'Delantero',
        team: brasil,
        imageUrl: 'https://example.com/neymar.jpg',
        dribbling: 94,
        speed: 88,
        dribble: 96,
        shooting: 84,
        passing: 86,
        defense: 36,
        physical: 62,
      },
      {
        name: 'Kylian Mbappé',
        age: 25,
        position: 'Delantero',
        team: teams.find(team => team.country === 'Francia'),
        imageUrl: 'https://example.com/mbappe.jpg',
        dribbling: 92,
        speed: 96,
        dribble: 91,
        shooting: 89,
        passing: 80,
        defense: 40,
        physical: 78,
      },
      {
        name: 'Christian Pulisic',
        age: 25,
        position: 'Mediocampista',
        team: teams.find(team => team.country === 'Estados Unidos'),
        imageUrl: 'https://example.com/pulisic.jpg',
        dribbling: 85,
        speed: 84,
        dribble: 86,
        shooting: 78,
        passing: 82,
        defense: 45,
        physical: 72,
      }
    ]);

    return players;
  }
}