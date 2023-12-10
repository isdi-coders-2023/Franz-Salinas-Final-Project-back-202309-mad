import createDebug from 'debug';
import { Repository } from '../repo';
import { LoginUser, User } from '../../entities/users.js';
import { UserModel } from './user.mongo.model.js';
import { HttpError } from '../../types/http.error.js';
import { Auth } from '../../services/auth.js';

const debug = createDebug('W9E:users:mongo:repo');

export class UserMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    newItem.password = await Auth.hast(newItem.password);
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async login(loginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({
      email: loginUser.email,
    }).exec();
    debug('REPO LOGIN', loginUser.email);

    if (!result || !(await Auth.compare(loginUser.password, result.password)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    debug(id, 'id value in getById in userMongoRepo');
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async update(id: string, updatedItem: Partial<User>): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }

  async search({
    key,
    value,
  }: {
    key: keyof User;
    value: any;
  }): Promise<User[]> {
    const result = await UserModel.find({ [key]: value })
      .populate('author', {
        notes: 0,
      })
      .exec();

    return result;
  }
}
