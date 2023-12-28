import { PaymentStatus, TicketModel } from '@src/domain/models/ticket.model';
import { ITicketRepository } from '@src/infra/database/repositories/interfaces/ticket-repository.interface';
import { inject, singleton } from 'tsyringe';


@singleton()
export class TicketPaymentHandler {
  constructor(
    @inject('TicketRepository') private readonly ticketRepository: ITicketRepository
  ) {}

  async execute(ticket: TicketModel): Promise<void> {
    const shouldApprove = Math.random() * 10 < 8;
    await this.ticketRepository.save({
      ...ticket,
      paymentStatus: shouldApprove ? PaymentStatus.APPROVED : PaymentStatus.DECLINED
    });
  }
}
