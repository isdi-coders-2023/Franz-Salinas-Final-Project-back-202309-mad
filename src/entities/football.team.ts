import { ImgData } from '../types/img.data';
import { Footballer } from './footballers';

export type FootballTeam = {
  teamName: string;
  footballers: Footballer[];
  foundation: string;
  coach: string;
  styleOfPlay: string;
  preferFormation: string;
  defensiveStyle: string;
  pressingSystem: string;
  teamShield: ImgData;
};
