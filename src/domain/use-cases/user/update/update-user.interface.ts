import { UpdateUserModel, UserModel } from '@src/domain/models/user.model';
import { AuthSession } from '@src/shared/auth.interface';

export interface IUpdateUserUseCase {
  execute(data: UpdateUserModel, session: AuthSession): Promise<UserModel>;
}
