import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Base from './base.entity';
import AddressEntity from './address.entity';
import { EventModel } from '@src/domain/models/event.model';
import { AddressModel } from '@src/domain/models/address.model';
import TicketEntity from './ticket.entity';

@Entity({ name: 'event' })
export default class EventEntity extends Base {
  @Column()
  public name?: string;

  @Column({ name: 'id_address', type: 'uuid' })
  public idAddress?: string;

  @Column({ array: true, type: 'uuid' })
  public administrators?: string[];

  @Column({ name: 'ticket_limit', type: 'int4' })
  public ticketLimit?: number;

  @Column({ name: 'ticket_price', type: 'numeric' })
  public ticketPrice?: number;

  @Column({ type: 'timestamptz', name: 'start_date' })
  public startDate?: Date;

  @Column({ type: 'timestamptz', name: 'end_date' })
  public endDate?: Date;

  @ManyToOne(() => AddressEntity, (address) => address.events)
  @JoinColumn({ name: 'id_address' })
  public address?: AddressEntity;

  @OneToMany(() => TicketEntity, (ticket) => ticket.event)
  public tickets?: TicketEntity[];

  ticketsBought?: number;

  entityToModel(): EventModel {
    return {
      id: this.id,
      name: this.name as string,
      idAddress: this.idAddress,
      administrators: this.administrators,
      ticketLimit: this.ticketLimit,
      ticketPrice: parseFloat(String(this.ticketPrice) ?? '0'),
      startDate: this.startDate?.toISOString() as string,
      endDate: this.endDate?.toISOString() as string,
      address: this.address as AddressModel | undefined,
      ticketsBought: this.ticketsBought,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    };
  }
}
