import BaseModel, { ISearchParams } from './base.model';

export interface EventModel extends BaseModel {
  name: string;
  idAddress?: string;
  administrators?: string[];
  ticketLimit?: number;
  ticketPrice?: number;
  startDate: string;
  endDate: string;
  ticketsBought?: number;
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

export interface CreateEventModel {
  name: string;
  idAddress?: string;
  administrators?: string[];
  ticketLimit?: number;
  ticketPrice?: number;
  startDate: string;
  endDate: string;
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

export interface UpdateEventModel {
  name?: string;
  idAddress?: string;
  administrators?: string[];
  ticketLimit?: number;
  ticketPrice?: number;
  startDate?: string;
  endDate?: string;
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

export interface EventSearchParams extends ISearchParams {
  name?: string;
  ticketPrice?: number;
  startDate?: string;
  endDate?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  },
  myEvents?: boolean;
}
