import { CreateTicketModel, PaymentType } from '@src/domain/models/ticket.model';
import { z } from 'zod';

export function createTicketValidation(data: CreateTicketModel): void {
  const schema = z.object({
    idEvent: z.string().uuid(),
    paymentType: z.nativeEnum(PaymentType)
  });

  schema.parse(data);
}

