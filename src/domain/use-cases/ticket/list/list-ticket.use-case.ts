import { TicketModel } from '@src/domain/models/ticket.model';
import { IListTicketUseCase } from './list-ticket.interface';
import { inject, singleton } from 'tsyringe';
import { ITicketRepository } from '@src/infra/database/repositories/interfaces/ticket-repository.interface';
import { AuthSession } from '@src/shared/auth.interface';

@singleton()
export class ListTicketUseCase implements IListTicketUseCase {
  constructor(
    @inject('TicketRepository') private readonly ticketRepository: ITicketRepository
  ) {}

  async execute(session: AuthSession): Promise<TicketModel[]> {
    return this.ticketRepository.findMany({ idUser: session.idUser });
  }
}
