import { AddressModel } from '../../../../domain/models/address.model';


export interface IAddressRepository {
  save(data: AddressModel): Promise<AddressModel>;
  findOne(data: Partial<AddressModel>): Promise<AddressModel | null>;
}
