import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { Team } from './teams/entities/team.entity';
import { Confederation } from './teams/entities/confederation.entity';
import { Player } from './players/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'panini-album.sqlite',
      entities: [Team, Confederation, Player],
      synchronize: true,
    }),
    TeamsModule,
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}