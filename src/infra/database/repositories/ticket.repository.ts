import { Repository } from 'typeorm';
import { singleton } from 'tsyringe';

import { TicketModel } from '@src/domain/models/ticket.model';
import { ITicketRepository } from '@src/infra/database/repositories/interfaces/ticket-repository.interface';
import TicketEntity from '../entities/ticket.entity';
import { DatabaseProvider } from '../typeorm-adapter';

@singleton()
export class TicketRepository implements ITicketRepository {
  private readonly repository: Repository<TicketEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(TicketEntity);
  }

  async save(data: TicketModel): Promise<TicketModel> {
    const ticket = await this.repository.save(data);

    return ticket as TicketModel;
  }

  async findOne(data: Partial<TicketModel>): Promise<TicketModel | null> {
    const ticket = await this.repository.findOne({ where: data });

    return ticket ? ticket as TicketModel : null;
  }

  async findMany(data: Partial<TicketModel>): Promise<TicketModel[]> {
    const ticket = await this.repository.find({ where: data, relations: ['event'] });

    return ticket as TicketModel[];
  }
}
