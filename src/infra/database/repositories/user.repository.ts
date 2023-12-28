import { UserModel } from '@src/domain/models/user.model';
import { IUserRepository } from '@src/infra/database/repositories/interfaces/user-repository.interface';
import UserEntity from '../entities/user.entity';
import { DatabaseProvider } from '../typeorm-adapter';
import { Repository } from 'typeorm';
import { singleton } from 'tsyringe';

@singleton()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor() {
    this.repository = DatabaseProvider.getRepository(UserEntity);
  }

  async save(data: UserModel): Promise<UserModel> {
    const user = await this.repository.save(data);

    return user as UserModel;
  }

  async findOne(data: Partial<UserModel>): Promise<UserModel | null> {
    const user = await this.repository.findOne({ where: data });

    if (!user) return null;

    return user as UserModel;
  }
}
