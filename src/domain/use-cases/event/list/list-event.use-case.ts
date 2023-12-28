import { EventModel, EventSearchParams } from '@src/domain/models/event.model';
import { IListEventUseCase } from './list-event.interface';
import { inject, singleton } from 'tsyringe';
import { IEventRepository } from '@src/infra/database/repositories/interfaces/event-repository.interface';
import { AuthSession } from '@src/shared/auth.interface';
import { IPaginationResponse } from '@src/domain/models/base.model';

@singleton()
export class ListEventUseCase implements IListEventUseCase {
  constructor(
    @inject('EventRepository') private readonly eventRepository: IEventRepository
  ) {}

  async execute(data: EventSearchParams, session?: AuthSession): Promise<IPaginationResponse<EventModel>> {
    return this.eventRepository.searchPagination(data, session);
  }
}
