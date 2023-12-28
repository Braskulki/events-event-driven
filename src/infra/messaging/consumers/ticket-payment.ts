/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { container } from 'tsyringe';
import { consumer } from '../kafka';
import { TicketPaymentHandler } from '../handlers/ticket/ticket-payment.handler';
import { TicketModel } from '@src/domain/models/ticket.model';

const handler = container.resolve<TicketPaymentHandler>('TicketPaymentHandler');
export async function consumerTicketPayment() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'tickets-payment', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('received message', message);
      try {
        if (message?.value?.toString()) {
          console.log(JSON.parse(message?.value?.toString()));
          await handler.execute(JSON.parse(message?.value?.toString()) as TicketModel);
        }
      } catch (e) {
        console.error('unable to handle incoming message', e);
      }
    }
  });
}
