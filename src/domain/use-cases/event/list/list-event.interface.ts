import { IPaginationResponse } from '@src/domain/models/base.model';
import { EventModel, EventSearchParams } from '@src/domain/models/event.model';
import { AuthSession } from '@src/shared/auth.interface';

export interface IListEventUseCase {
  execute(data: EventSearchParams, session?: AuthSession): Promise<IPaginationResponse<EventModel>>;
}
