import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { Confederation } from './entities/confederation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Confederation])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}