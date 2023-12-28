import { CreateTicketModel, TicketModel } from '@src/domain/models/ticket.model';
import { AuthSession } from '@src/shared/auth.interface';

export interface ICreateTicketUseCase {
  execute(data: CreateTicketModel, session: AuthSession): Promise<TicketModel>;
}
