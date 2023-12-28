import BaseModel from './base.model';

export interface UserModel extends BaseModel {
  name: string;
  email: string;
  idAddress?: string;
}

export interface CreateUserModel {
  name: string;
  email: string;
  password: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  }
}

export interface UpdateUserModel {
  name?: string;
  email?: string;
  password?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  }
}

