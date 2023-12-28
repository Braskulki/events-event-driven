import { TicketModel } from '../../../../domain/models/ticket.model';


export interface ITicketRepository {
  save(data: TicketModel): Promise<TicketModel>;
  findOne(data: Partial<TicketModel>): Promise<TicketModel | null>;
  findMany(data: Partial<TicketModel>): Promise<TicketModel[]>;
}
