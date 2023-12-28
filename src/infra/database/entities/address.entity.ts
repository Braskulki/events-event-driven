import { Column, Entity, OneToMany } from 'typeorm';
import Base from './base.entity';
import EventEntity from './event.entity';

@Entity({ name: 'address' })
export default class AddressEntity extends Base {
  @Column()
  public street?: string;

  @Column()
  public number?: string;

  @Column()
  public complement?: string;

  @Column()
  public neighborhood?: string;

  @Column()
  public city?: string;

  @Column()
  public state?: string;

  @Column()
  public country?: string;

  @OneToMany(() => EventEntity, (event) => event.address)
  public events?: EventEntity[];
}
