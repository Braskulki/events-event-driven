import { CreateTicketModel, TicketModel } from '@src/domain/models/ticket.model';
import { ICreateTicketUseCase } from './create-ticket.interface';
import { inject, singleton } from 'tsyringe';
import { ITicketRepository } from '@src/infra/database/repositories/interfaces/ticket-repository.interface';
import { AuthSession } from '@src/shared/auth.interface';
import { IEventRepository } from '@src/infra/database/repositories/interfaces/event-repository.interface';
import BusinessError from '@src/shared/errors/business-error';
import { sendMessage } from '@src/infra/messaging/kafka';

@singleton()
export class CreateTicketUseCase implements ICreateTicketUseCase {
  constructor(
    @inject('TicketRepository') private readonly ticketRepository: ITicketRepository,
    @inject('EventRepository') private readonly eventRepository: IEventRepository
  ) {}

  async execute(data: CreateTicketModel, session: AuthSession): Promise<TicketModel> {
    const dataToSave: TicketModel = {
      paymentType: data.paymentType,
      idEvent: data.idEvent,
      idUser: session.idUser
    };

    const event = await this.eventRepository.findById(data.idEvent);

    if (event?.ticketLimit && (event.ticketLimit - (event?.ticketsBought ?? 0)) <= 0) {
      throw new BusinessError('Ticket limit reached');
    }

    const ticket = await this.ticketRepository.save(dataToSave);

    await sendMessage({ topic: 'tickets-payment', messages: [{ value: JSON.stringify(ticket) }] });

    return ticket;
  }
}
