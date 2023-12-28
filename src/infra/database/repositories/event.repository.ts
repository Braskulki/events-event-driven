import { Between, FindOptionsWhere, ILike, Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { singleton } from 'tsyringe';

import { EventModel, EventSearchParams } from '@src/domain/models/event.model';
import { IEventRepository } from '@src/infra/database/repositories/interfaces/event-repository.interface';
import EventEntity from '../entities/event.entity';
import { DatabaseProvider } from '../typeorm-adapter';
import { AuthSession } from '@src/shared/auth.interface';
import { IPaginationResponse } from '@src/domain/models/base.model';
import { PaymentStatus } from '@src/domain/models/ticket.model';

@singleton()
export class EventRepository implements IEventRepository {
  private readonly repository: Repository<EventEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(EventEntity);
  }

  async save(data: EventModel): Promise<EventModel> {
    const event = await this.repository.save(data);

    return event as EventModel;
  }

  async findOne(data: Partial<EventModel>): Promise<EventModel | null> {
    const where: FindOptionsWhere<EventEntity> = {
      ...(data.id && { id: data.id }),
      ...(data.name && { name: ILike(`%${data.name}%`) }),
      ...(data.createdBy && { createdBy: data.createdBy }),
      ...(data.ticketLimit && { ticketLimit: data.ticketLimit }),
      ...(data.ticketPrice && { ticketPrice: data.ticketPrice }),
      ...(data.startDate && data.endDate && {
        startDate: Between(new Date(data.startDate), new Date(data.endDate)),
        endDate: Between(new Date(data.startDate), new Date(data.endDate))
      }),
      ...(data.address && {
        address: {
          street: data.address.street,
          number: data.address.number,
          complement: data.address.complement,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          country: data.address.country
        }
      })
    };

    const event = await this.repository.findOne({ where });

    return event ? event.entityToModel() : null;
  }

  async findById(id: string): Promise<EventModel | null> {
    const event = await this.repository.createQueryBuilder('event')
      .loadRelationCountAndMap('event.ticketsBought', 'event.tickets', 'tickets', (qb) => {
        return qb.where('tickets.paymentStatus = :status', { status: PaymentStatus.APPROVED });
      })
      .where({ id })
      .getOne();

    return event ? event.entityToModel() : null;
  }

  async searchPagination(params: EventSearchParams, session?: AuthSession): Promise<IPaginationResponse<EventModel>> {
    const where: FindOptionsWhere<EventEntity> = {
      ...(params.name && { name: ILike(`%${params.name}%`) }),
      ...(params.startDate && { startDate: MoreThanOrEqual(new Date(params.startDate)) }),
      ...(params.endDate && { endDate: LessThanOrEqual(new Date(params.endDate)) }),
      ...(params.ticketPrice && { ticketPrice: LessThanOrEqual(params.ticketPrice) }),
      ...(params.address?.country && { address: { country: params.address.country } }),
      ...(params.address?.state && { address: { state: params.address.state } }),
      ...(params.address?.city && { address: { city: params.address.city } })
    };

    const qb = this.repository.createQueryBuilder('event');

    if (params.address) {
      qb.innerJoinAndSelect('event.address', 'address');
    } else {
      qb.leftJoinAndSelect('event.address', 'address');
    }

    qb.where(where);

    if (params.myEvents && session?.idUser) {
      qb.andWhere(`event.administrators @> ARRAY[UUID('${session.idUser}')]`);
    }

    qb.loadRelationCountAndMap('event.ticketsBought', 'event.tickets', 'tickets');

    const limit = params.limit ? params.limit : 10;
    const skip = params.page ? params.page * limit : 0;

    qb.skip(skip).take(limit);


    const [rows, count] = await qb.getManyAndCount();

    return { rows: rows.map((event) => event.entityToModel()), count };
  }
}
