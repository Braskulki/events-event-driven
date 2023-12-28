import { UserModel } from '@src/domain/models/user.model';
import { ISelfDeleteUserUseCase } from './delete-user.interface';
import { inject, singleton } from 'tsyringe';
import { IUserRepository } from '@src/infra/database/repositories/interfaces/user-repository.interface';
import { IAuthenticationService } from '@src/infra/authentication/authentication.interface';
import BusinessError from '@src/shared/errors/business-error';
import { AuthSession } from '@src/shared/auth.interface';

@singleton()
export class SelfDeleteUserUseCase implements ISelfDeleteUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('AuthenticationService') private readonly authenticationService: IAuthenticationService
  ) {}

  async execute(session: AuthSession): Promise<void> {
    const userExists = await this.userRepository.findOne({ id: session.idUser });

    if (!userExists) throw new BusinessError('User not found');

    await this.authenticationService.delete(session.idUser);

    const dataToSave: UserModel = {
      ...userExists,
      id: session.idUser,
      deletedAt: new Date(),
      updatedAt: new Date(),
      updatedBy: session.idUser
    };

    await this.userRepository.save(dataToSave);
  }
}
