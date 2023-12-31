import { Schema, model } from 'mongoose';
import { Footballer } from '../../entities/footballers';

const footballerSchema = new Schema<Footballer>({
  id: {
    type: String,
    required: false,
  },
  name: { type: String, required: false },

  position: {
    type: String,
    required: false,
  },

  nationality: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  imageFootballer: {
    publicId: String,
    size: Number,
    format: String,
    url: String,
    height: Number,
    width: Number,
  },
  surname: {
    type: String,
    require: false,
  },

  preferFoot: {
    type: String,
    required: false,
  },

  pace: {
    type: String,
    required: false,
  },
  shoot: {
    type: String,
    required: false,
  },
  passing: {
    type: String,
    required: false,
  },
  overall: {
    type: String,
    required: false,
  },
  drible: {
    type: String,
    required: false,
  },
  defense: {
    type: String,
    required: false,
  },
  physicality: {
    type: String,
    required: false,
  },
  briefStory: {
    type: String,
    required: false,
  },

  teamShieldFlag: {
    publicId: String,
    size: Number,
    format: String,
    url: String,
    height: Number,
    width: Number,
  },

  countryFlag: {
    publicId: String,
    size: Number,
    format: String,
    url: String,
    height: Number,
    width: Number,
  },
  detailsImage: {
    publicId: String,
    size: Number,
    format: String,
    url: String,
    height: Number,
    width: Number,
  },

  currentTeam: {
    type: String,
    required: false,
  },
});

footballerSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FootballerModel = model<Footballer>(
  'Footballer',
  footballerSchema,
  'footballers'
);
