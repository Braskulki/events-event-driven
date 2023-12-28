import {
  CreateEventUseCase,
  ICreateEventUseCase,
  IListEventUseCase,
  IUpdateEventUseCase,
  ListEventUseCase,
  UpdateEventUseCase
} from '@src/domain/use-cases/event';
import { createEventValidation, updateEventValidation } from '@src/domain/validators/event.validators';
import { CreateEventModel, EventModel, EventSearchParams } from '@src/domain/models/event.model';
import { Body, JsonController, Post, Put, Req, UseBefore, Param, Get, QueryParams } from 'routing-controllers';
import { container, inject, singleton } from 'tsyringe';
import authenticate from '../middlewares/authenticate';
import { Request } from 'express';
import { IPaginationResponse } from '@src/domain/models/base.model';


@singleton()
@JsonController('/event')
export class EventController {
  constructor(
    @inject('CreateEventUseCase') private readonly createEventUseCase: ICreateEventUseCase,
    @inject('UpdateEventUseCase') private readonly updateEventUseCase: IUpdateEventUseCase,
    @inject('ListEventUseCase') private readonly listEventUseCase: IListEventUseCase
  ) {
    this.createEventUseCase = container.resolve<CreateEventUseCase>('CreateEventUseCase');
    this.updateEventUseCase = container.resolve<UpdateEventUseCase>('UpdateEventUseCase');
    this.listEventUseCase = container.resolve<ListEventUseCase>('ListEventUseCase');
  }

  @Post('')
  @UseBefore(authenticate)
  async create(@Body() body: CreateEventModel, @Req() req: Request): Promise<EventModel> {
    createEventValidation(body);

    const event = await this.createEventUseCase.execute(body, req.session);

    return event;
  }

  @Put('/:id')
  @UseBefore(authenticate)
  async update(@Body() body: CreateEventModel, @Param('id') id: string, @Req() req: Request): Promise<EventModel> {
    updateEventValidation(body);

    const event = await this.updateEventUseCase.execute(id, body, req.session);

    return event;
  }

  @Get('')
  async list(
    @QueryParams() params: EventSearchParams
  ): Promise<IPaginationResponse<EventModel>> {
    const event = await this.listEventUseCase.execute(params);

    return event;
  }

  @Get('/my-events')
  @UseBefore(authenticate)
  async listMyEvent(
    @QueryParams() params: EventSearchParams,
    @Req() req: Request
  ): Promise<IPaginationResponse<EventModel>> {
    const event = await this.listEventUseCase.execute({ ...params, myEvents: true }, req.session);

    return event;
  }

}
