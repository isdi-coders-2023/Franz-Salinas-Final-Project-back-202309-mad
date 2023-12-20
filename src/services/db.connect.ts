import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const password = process.env.PASSWORD;
  const dataBase = 'DREAMTEAM3';
  const connectString = `mongodb+srv://${user}:${password}@cluster0.gdj9qel.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

  return mongoose.connect(connectString);
};
