import BaseModel from './base.model';

export interface AddressModel extends BaseModel {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}
