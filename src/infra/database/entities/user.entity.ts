import { Column, Entity } from 'typeorm';
import Base from './base.entity';

@Entity({ name: 'user' })
export default class UserEntity extends Base {
  @Column()
  public name?: string;

  @Column({ name: 'id_address', type: 'uuid' })
  public idAddress?: string;

  @Column()
  public email?: string;
}
