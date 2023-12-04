import { Schema, model } from 'mongoose';
import { User } from '../../entities/users';
import { FootballTeam } from '../../entities/football.team';

const footballTeamSchema = new Schema<FootballTeam>({
  teamName: {
    type: String,
    require: true,
  },
});
