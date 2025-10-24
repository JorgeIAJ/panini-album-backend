import { Controller, Get, Param, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  getAllTeams(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  getTeamById(@Param('id') id: number): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  @Get('confederation/:confederationId')
  getTeamsByConfederation(@Param('confederationId') confederationId: number): Promise<Team[]> {
    return this.teamsService.findByConfederation(confederationId);
  }

  @Post('seed')
  seedData() {
    return this.teamsService.seedData();
  }
}