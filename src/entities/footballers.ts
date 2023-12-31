import { ImgData } from '../types/img.data';
import { User } from './users';

export type Footballer = {
  id: string;
  name: string;
  position: string;
  nationality: string;
  age: string;
  author: User;
  surname: string;
  preferFoot: string;
  pace: string;
  shoot: string;
  passing: string;
  overall: string;
  drible: string;
  defense: string;
  physicality: string;
  briefStory: string;
  imageFootballer: ImgData;
  teamShieldFlag: ImgData;
  countryFlag: ImgData;
  detailsImage: ImgData;
  currentTeam: string;
};
