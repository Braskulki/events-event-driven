import { FindOptionsWhere } from 'typeorm';
import { UserModel } from '../../../../domain/models/user.model';


export interface IUserRepository {
  save(data: UserModel): Promise<UserModel>;
  findOne(data: FindOptionsWhere<UserModel>): Promise<UserModel | null>;
}
