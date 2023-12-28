import { CreateEventModel, EventModel } from '@src/domain/models/event.model';
import { AuthSession } from '@src/shared/auth.interface';

export interface ICreateEventUseCase {
  execute(data: CreateEventModel, session: AuthSession): Promise<EventModel>;
}
