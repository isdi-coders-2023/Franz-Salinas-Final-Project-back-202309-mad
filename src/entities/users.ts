import { ImgData } from '../types/img.data';
import { Footballer } from './footballers';

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
  footballers: Footballer[];
  teamName: string;
  styleOfPlay: string;
};
