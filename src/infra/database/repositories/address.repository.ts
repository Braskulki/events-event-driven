import { Repository } from 'typeorm';
import { singleton } from 'tsyringe';

import { AddressModel } from '@src/domain/models/address.model';
import { IAddressRepository } from '@src/infra/database/repositories/interfaces/address-repository.interface';
import AddressEntity from '../entities/address.entity';
import { DatabaseProvider } from '../typeorm-adapter';

@singleton()
export class AddressRepository implements IAddressRepository {
  private readonly repository: Repository<AddressEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(AddressEntity);
  }

  async save(data: AddressModel): Promise<AddressModel> {
    const address = await this.repository.save(data);

    return address as AddressModel;
  }

  async findOne(data: Partial<AddressModel>): Promise<AddressModel | null> {
    const address = await this.repository.findOne({ where: data });

    if (!address) return null;

    return address as AddressModel;
  }
}
