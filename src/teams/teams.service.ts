import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { Confederation } from './entities/confederation.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
    @InjectRepository(Confederation)
    private confederationRepository: Repository<Confederation>,
  ) {}

  // Obtener todos los equipos
  async findAll(): Promise<Team[]> {
    return this.teamsRepository.find({
      relations: ['confederation', 'players'],
    });
  }

  // Obtener un equipo por ID
  async findOne(id: number): Promise<Team> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['confederation', 'players'],
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  // Obtener equipos por confederación
  async findByConfederation(confederationId: number): Promise<Team[]> {
    return this.teamsRepository.find({
      where: { confederation: { id: confederationId } },
      relations: ['confederation'],
    });
  }

  // Crear datos de ejemplo
  async seedData() {
    // Crear confederaciones
    const concacaf = await this.confederationRepository.save({
      name: 'CONCACAF',
      region: 'Norte y Centro América',
    });

    const conmebol = await this.confederationRepository.save({
      name: 'CONMEBOL',
      region: 'Sudamérica',
    });

    const uefa = await this.confederationRepository.save({
      name: 'UEFA',
      region: 'Europa',
    });

    // Crear equipos
    const teams = await this.teamsRepository.save([
      {
        country: 'Argentina',
        nickname: 'Albiceleste',
        confederation: conmebol,
        worldCupTitles: 3,
        flagImageUrl: 'https://flagcdn.com/w320/ar.png',
      },
      {
        country: 'Brasil',
        nickname: 'Canarinha',
        confederation: conmebol,
        worldCupTitles: 5,
        flagImageUrl: 'https://flagcdn.com/w320/br.png',
      },
      {
        country: 'Estados Unidos',
        nickname: 'Stars and Stripes',
        confederation: concacaf,
        worldCupTitles: 0,
        flagImageUrl: 'https://flagcdn.com/w320/us.png',
      },
      {
        country: 'Francia',
        nickname: 'Les Bleus',
        confederation: uefa,
        worldCupTitles: 2,
        flagImageUrl: 'https://flagcdn.com/w320/fr.png',
      },
    ]);

    return { confederations: [concacaf, conmebol, uefa], teams };
  }
}