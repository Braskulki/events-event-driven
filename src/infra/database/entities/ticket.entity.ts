import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Base from './base.entity';
import EventEntity from './event.entity';

@Entity({ name: 'ticket' })
export default class TicketEntity extends Base {
  @Column({ name: 'id_event', type: 'uuid' })
  public idEvent?: string;

  @Column({ name: 'id_user', type: 'uuid' })
  public idUser?: string;

  @Column({ name: 'payment_type', type: 'int4' })
  public paymentType?: number;

  @Column({ name: 'payment_status', type: 'int4' })
  public paymentStatus?: number;

  @ManyToOne(() => EventEntity, (event) => event.tickets)
  @JoinColumn({ name: 'id_event' })
  public event?: EventEntity;
}
