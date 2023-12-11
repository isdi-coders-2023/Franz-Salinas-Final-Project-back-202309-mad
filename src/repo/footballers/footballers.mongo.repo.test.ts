import { Footballer } from '../../entities/footballers.js';
import { UserModel } from '../users/user.mongo.model.js';

import { UserMongoRepo } from '../users/user.mongo.repo.js';
import { FootballerModel } from './footballers.mongo.model.js';
import { FootballersMongoRepo } from './footballers.mongo.repo.js';

jest.mock('./footballers.mongo.model.js');
jest.mock('../users/user.mongo.model.js');

describe('Given FootballersMongoRepo...', () => {
  let repo: FootballersMongoRepo;

  describe('When we instantiate without erros', () => {
    const exec = jest.fn().mockResolvedValue('Test');

    beforeEach(() => {
      FootballerModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      FootballerModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      FootballerModel.create = jest.fn().mockReturnValue('Test');

      FootballerModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
      FootballerModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec,
      });
      repo = new FootballersMongoRepo();
    });

    test('Then it should execute getAll...', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute create', async () => {
      UserMongoRepo.prototype.getById = jest
        .fn()
        .mockResolvedValue({ footballers: [] });
      UserMongoRepo.prototype.update = jest.fn();
      const result = await repo.create({ author: {} } as Omit<
        Footballer,
        'id'
      >);
      expect(result).toBe('Test');
    });

    test('Then it should execute update...', async () => {
      const result = await repo.update('', { position: 'Delantero' });
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getById...', async () => {
      const result = await repo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('should delete the footballer and remove it from the author footballers array', async () => {
      const id = 'testId';

      const exec = jest.fn().mockResolvedValue({});
      FootballerModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec,
      });

      UserModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec,
      });
      await repo.delete(id);

      expect(FootballerModel.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it with erros', () => {
    const exec = jest.fn().mockResolvedValue(null);

    beforeEach(() => {
      FootballerModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      FootballerModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
      FootballerModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec,
      });
      repo = new FootballersMongoRepo();
    });

    test('Then it should execute getById with and erros...', async () => {
      expect(repo.getById('')).rejects.toThrow();
    });

    test('Then it should execute updater with and erros...', async () => {
      expect(repo.update('', { name: 'luis' })).rejects.toThrow();
    });
  });
});
