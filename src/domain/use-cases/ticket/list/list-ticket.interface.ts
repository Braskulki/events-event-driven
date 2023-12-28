import { TicketModel } from '@src/domain/models/ticket.model';
import { AuthSession } from '@src/shared/auth.interface';

export interface IListTicketUseCase {
  execute(session: AuthSession): Promise<TicketModel[]>;
}
