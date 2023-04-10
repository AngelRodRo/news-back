import { Inject, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { KeysModel } from '../models/Keys';

@Service()
export class KeysService {
  constructor(@Inject(KeysModel) private keysModel: MongooseModel<KeysModel>) {}

  async getKeyByType(type: string): Promise<KeysModel | null> {
    const key = await this.keysModel.findOne({ type }).exec();
    return key;
  }
}