import { ImgData } from '../types/img.data';
import { FootballTeam } from './football.team';

export type LoginUser = {
  email: string;
  password: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  avatar: ImgData;
  role: 'Admin' | 'User';
  footballTeam: FootballTeam;
};
