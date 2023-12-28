import { CreateEventModel, EventModel } from '@src/domain/models/event.model';
import { ICreateEventUseCase } from './create-event.interface';
import { inject, singleton } from 'tsyringe';
import { IEventRepository } from '@src/infra/database/repositories/interfaces/event-repository.interface';
import { IAddressRepository } from '@src/infra/database/repositories/interfaces/address-repository.interface';
import { AddressModel } from '@src/domain/models/address.model';
import BusinessError from '@src/shared/errors/business-error';
import { AuthSession } from '@src/shared/auth.interface';

@singleton()
export class CreateEventUseCase implements ICreateEventUseCase {
  constructor(
    @inject('EventRepository') private readonly eventRepository: IEventRepository,
    @inject('AddressRepository') private readonly addressRepository: IAddressRepository
  ) {}

  async execute(data: CreateEventModel, session: AuthSession): Promise<EventModel> {
    const administrators: string[] = data.administrators ?? [];
    if (!administrators.find((i) => i === session.idUser)) {
      administrators.push(session.idUser);
    }

    const dataToSave: EventModel = {
      name: data.name,
      administrators,
      ticketLimit: data.ticketLimit,
      ticketPrice: data.ticketPrice,
      startDate: data.startDate,
      endDate: data.endDate,
      createdBy: session.idUser
    };

    if (data.address) {
      const eventExists = await this.eventRepository.findOne(data);

      if (eventExists) throw new BusinessError('Already an event on this address', { teste: true });

      const addressToSave: AddressModel = {
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        country: data.address.country,
        createdBy: session.idUser
      };

      const address = await this.addressRepository.save(addressToSave);
      dataToSave.idAddress = address.id;
    }


    return this.eventRepository.save(dataToSave);
  }
}
