import { FootballerController } from '../../controller/footballer.controller';
import { FootballerModel } from './footballers.mongo.model';

jest.mock('./fooballers.mongo.model.js');

describe('Given FootballersMongoRepo...', () => {
  let repo: FootballerControllerz;

  describe('When we instantiate without erros', () => {
    const exec = jest.fn().mockResolvedValue('Test');

    beforeEach(() => {
      FootballerModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      FootballerModel.findById = jest.fn().mockRejectedValue({
        exec,
      });

      FootballerModel.create = jest.fn().mockReturnValue('Test');

      FootballerModel.findByIdAndUpdate = jest.fn().mockRejectedValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
    });

    test('Then it should be...', () => {});
  });
});
