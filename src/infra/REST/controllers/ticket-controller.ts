import {
  CreateTicketUseCase,
  ICreateTicketUseCase,
  IListTicketUseCase,
  ListTicketUseCase
} from '@src/domain/use-cases/ticket';
import { createTicketValidation } from '@src/domain/validators/ticket.validators';
import { CreateTicketModel, TicketModel } from '@src/domain/models/ticket.model';
import { Body, JsonController, Post, Req, UseBefore, Get } from 'routing-controllers';
import { container, inject, singleton } from 'tsyringe';
import authenticate from '../middlewares/authenticate';
import { Request } from 'express';

@singleton()
@JsonController('/ticket')
export class TicketController {
  constructor(
    @inject('CreateTicketUseCase') private readonly createTicketUseCase: ICreateTicketUseCase,
    @inject('ListTicketUseCase') private readonly listTicketUseCase: IListTicketUseCase
  ) {
    this.createTicketUseCase = container.resolve<CreateTicketUseCase>('CreateTicketUseCase');
    this.listTicketUseCase = container.resolve<ListTicketUseCase>('ListTicketUseCase');
  }

  @Post('')
  @UseBefore(authenticate)
  async create(@Body() body: CreateTicketModel, @Req() req: Request): Promise<TicketModel> {
    createTicketValidation(body);

    const ticket = await this.createTicketUseCase.execute(body, req.session);

    return ticket;
  }

  @Get('')
  @UseBefore(authenticate)
  async list(@Req() req: Request): Promise<TicketModel[]> {
    const ticket = await this.listTicketUseCase.execute(req.session);

    return ticket;
  }
}
