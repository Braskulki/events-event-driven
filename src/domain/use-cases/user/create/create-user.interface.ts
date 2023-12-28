import { CreateUserModel, UserModel } from '@src/domain/models/user.model';

export interface ICreateUserUseCase {
  execute(data: CreateUserModel): Promise<UserModel>;
}
