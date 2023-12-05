import { Schema, model } from 'mongoose';
import { User } from '../../entities/users';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },

  name: {
    type: String,
  },

  avatar: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },

  role: {
    type: String,
    required: true,
    enum: ['Admin', 'User'],
    default: 'User',
  },

  surname: {
    type: String,
  },

  footballers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Footballer',
    },
  ],
  teamName: {
    type: String,
    require: false,
  },
  styleOfPlay: {
    type: String,
    require: false,
  },
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model<User>('User', userSchema, 'users');
