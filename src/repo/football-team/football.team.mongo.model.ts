/* Just in case I need it later import { Schema, model } from 'mongoose';

import { FootballTeam } from '../../entities/football.team';

const footballTeamSchema = new Schema<FootballTeam>({
  teamName: {
    type: String,
    require: true,
  },

  foundation: {
    type: String,
    require: false,
  },
  coach: {
    type: String,
    require: false,
  },
  styleOfPlay: {
    type: String,
    require: false,
  },
  preferFormation: { type: String, require: false },
  defensiveStyle: {
    type: String,
    required: false,
  },
  pressingSystem: {
    type: String,
    required: false,
  },
  teamShield: {
    publicId: String,
    format: String,
    size: Number,
    url: String,
    width: Number,
    height: Number,
  },

  footballers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Footballer',
    },
  ],
});

footballTeamSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FootballTeamModel = model<FootballTeam>(
  'FootballTeam',
  footballTeamSchema
   'footballteams'
);
 */
