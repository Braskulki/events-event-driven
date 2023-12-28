import KeycloakClient from '@src/infra/authentication/keycloak/keycloak';
import { AddressRepository, EventRepository, UserRepository } from '@src/infra/database/repositories';
import { TicketRepository } from '@src/infra/database/repositories/ticket.repository';
import { CreateEventUseCase, ListEventUseCase, UpdateEventUseCase } from '@src/domain/use-cases/event';
import { CreateTicketUseCase, ListTicketUseCase } from '@src/domain/use-cases/ticket';
import { CreateUserUseCase, SelfDeleteUserUseCase, UpdateUserUseCase } from '@src/domain/use-cases/user';
import { container } from 'tsyringe';
import { TicketPaymentHandler } from '@src/infra/messaging/handlers/ticket/ticket-payment.handler';

export function injectContainers(): void {
  container.registerSingleton('UserRepository', UserRepository);
  container.registerSingleton('AddressRepository', AddressRepository);
  container.registerSingleton('EventRepository', EventRepository);
  container.registerSingleton('TicketRepository', TicketRepository);

  container.registerSingleton('CreateUserUseCase', CreateUserUseCase);
  container.registerSingleton('UpdateUserUseCase', UpdateUserUseCase);
  container.registerSingleton('SelfDeleteUserUseCase', SelfDeleteUserUseCase);

  container.registerSingleton('CreateEventUseCase', CreateEventUseCase);
  container.registerSingleton('UpdateEventUseCase', UpdateEventUseCase);
  container.registerSingleton('ListEventUseCase', ListEventUseCase);

  container.registerSingleton('CreateTicketUseCase', CreateTicketUseCase);
  container.registerSingleton('ListTicketUseCase', ListTicketUseCase);


  container.registerSingleton('AuthenticationService', KeycloakClient);

  //handlers
  container.registerSingleton('TicketPaymentHandler', TicketPaymentHandler);
}
