import { Footballer } from '../../entities/footballers';
import { UserMongoRepo } from '../users/user.mongo.repo';
import { FootballerModel } from './footballers.mongo.model';
import { FootballersMongoRepo } from './footballers.mongo.repo';

jest.mock('./footballers.mongo.model.js');

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
  });
});
