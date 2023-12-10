import { Footballer } from '../../entities/footballers.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { FootballerModel } from './footballers.mongo.model.js';
import { UserMongoRepo } from '../users/user.mongo.repo.js';

const debug = createDebug('W7E:footballers:mongo:repo');

export class FootballersMongoRepo implements Repository<Footballer> {
  repoUser: UserMongoRepo; // Para poder hacer el create necesitamos ligar
  constructor() {
    this.repoUser = new UserMongoRepo();
    debug('Instatiated');
  }

  async getAll(): Promise<Footballer[]> {
    const data = await FootballerModel.find()
      .populate('author', { footballers: 0 })
      .exec(); //  Si hacemos await FootballersModel.find().populate('autor', {age:0}).exec(); NO nos mostraria el age.
    return data;
  }

  async getById(id: string): Promise<Footballer> {
    debug(id, 'id value in getById');
    const result = await FootballerModel.findById(id)
      .populate('author', { footballers: 0 })
      .exec();
    debug('get by id result', result);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  // Adaptar este con el private save (sustituirlo por el fs.writefile)

  async create(newItem: Omit<Footballer, 'id'>): Promise<Footballer> {
    const userID = newItem.author.id;
    debug('userID value', newItem);

    const user = await this.repoUser.getById(userID);
    const result: Footballer = await FootballerModel.create({
      ...newItem,
      author: userID,
    });
    user.footballers.push(result);
    await this.repoUser.update(userID, user);

    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Footballer>
  ): Promise<Footballer> {
    const result = await FootballerModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', { footballers: 0 })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const newfootballers = await FootballerModel.findByIdAndDelete(id).exec();

    if (!newfootballers) {
      throw new HttpError(404, 'Not found', 'It is not possible to delete');
    }
  }

  async search({
    key,
    value,
  }: {
    key: keyof Footballer;
    value: unknown;
  }): Promise<Footballer[]> {
    const result = await FootballerModel.find({ [key]: value })
      .populate('author', {
        footballers: 0,
      })
      .exec();

    return result;
  }
}
