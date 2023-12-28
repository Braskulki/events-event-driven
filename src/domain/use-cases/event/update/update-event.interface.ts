import { UpdateEventModel, EventModel } from '@src/domain/models/event.model';
import { AuthSession } from '@src/shared/auth.interface';

export interface IUpdateEventUseCase {
  execute(id: string, data: UpdateEventModel, session: AuthSession): Promise<EventModel>;
}
