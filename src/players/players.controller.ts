import { Controller, Get, Param, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  getAllPlayers(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  getPlayerById(@Param('id') id: number): Promise<Player> {
    return this.playersService.findOne(id);
  }

  @Get('team/:teamId')
  getPlayersByTeam(@Param('teamId') teamId: number): Promise<Player[]> {
    return this.playersService.findByTeam(teamId);
  }

  @Post('seed')
  seedPlayers() {
    return this.playersService.seedPlayers();
  }
}