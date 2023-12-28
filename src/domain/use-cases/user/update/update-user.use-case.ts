import { UpdateUserModel, UserModel } from '@src/domain/models/user.model';
import { IUpdateUserUseCase } from './update-user.interface';
import { inject, singleton } from 'tsyringe';
import { IUserRepository } from '@src/infra/database/repositories/interfaces/user-repository.interface';
import { IAddressRepository } from '@src/infra/database/repositories/interfaces/address-repository.interface';
import { AddressModel } from '@src/domain/models/address.model';
import { IAuthenticationService } from '@src/infra/authentication/authentication.interface';
import BusinessError from '@src/shared/errors/business-error';
import { AuthSession } from '@src/shared/auth.interface';

@singleton()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('AddressRepository') private readonly addressRepository: IAddressRepository,
    @inject('AuthenticationService') private readonly authenticationService: IAuthenticationService
  ) {}

  async execute(data: UpdateUserModel, session: AuthSession): Promise<UserModel> {
    const userExists = await this.userRepository.findOne({ id: session.idUser });

    if (!userExists) throw new BusinessError('User not found');

    const dataToSave: UserModel = {
      id: session.idUser,
      name: data.name ? data.name : userExists.name,
      email: data.email ? data.email : userExists.email,
      updatedAt: new Date(),
      updatedBy: session.idUser
    };

    if (data.email) {
      await this.authenticationService.updateUser({ id: session.idUser, newEmail: data.email });
    }

    if (data.password) {
      await this.authenticationService.updatePassword({ id: session.idUser, password: data.password });
    }

    if (data.address) {
      const addressToSave: AddressModel = {
        ...(userExists.idAddress && { id: userExists.idAddress }),
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        country: data.address.country
      };

      const address = await this.addressRepository.save(addressToSave);
      dataToSave.idAddress = address.id;
    }


    return this.userRepository.save(dataToSave);
  }
}
