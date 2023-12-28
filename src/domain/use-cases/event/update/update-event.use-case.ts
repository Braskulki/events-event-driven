import { EventModel, UpdateEventModel } from '@src/domain/models/event.model';
import { IUpdateEventUseCase } from './update-event.interface';
import { inject, singleton } from 'tsyringe';
import { IEventRepository } from '@src/infra/database/repositories/interfaces/event-repository.interface';
import { IAddressRepository } from '@src/infra/database/repositories/interfaces/address-repository.interface';
import { AddressModel } from '@src/domain/models/address.model';
import BusinessError from '@src/shared/errors/business-error';
import { AuthSession } from '@src/shared/auth.interface';

@singleton()
export class UpdateEventUseCase implements IUpdateEventUseCase {
  constructor(
    @inject('EventRepository') private readonly eventRepository: IEventRepository,
    @inject('AddressRepository') private readonly addressRepository: IAddressRepository
  ) {}

  async execute(id: string, data: UpdateEventModel, session: AuthSession): Promise<EventModel> {
    const eventExists = await this.eventRepository.findOne({ id });

    if (!eventExists) throw new BusinessError('Event not found');

    const administrators: string[] = data.administrators ?? eventExists.administrators ?? [];
    if (!administrators.find((i) => i === session.idUser)) {
      administrators.push(session.idUser);
    }

    const dataToSave: EventModel = {
      ...eventExists,
      ...(data.name && { name: data.name }),
      ...(administrators && { administrators: administrators }),
      ...(data.ticketLimit && { ticketLimit: data.ticketLimit }),
      ...(data.ticketPrice && { ticketPrice: data.ticketPrice }),
      ...(data.startDate && { startDate: data.startDate }),
      ...(data.endDate && { endDate: data.endDate }),
      updatedBy: session.idUser,
      updatedAt: new Date()
    };

    if (data.address) {
      const addressToSave: AddressModel = {
        ...(eventExists.idAddress && { id: eventExists.idAddress }),
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
