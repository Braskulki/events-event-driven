import { CreateUserModel, UserModel } from '@src/domain/models/user.model';
import { ICreateUserUseCase } from './create-user.interface';
import { inject, singleton } from 'tsyringe';
import { IUserRepository } from '@src/infra/database/repositories/interfaces/user-repository.interface';
import { IAddressRepository } from '@src/infra/database/repositories/interfaces/address-repository.interface';
import { AddressModel } from '@src/domain/models/address.model';
import { IAuthenticationService } from '@src/infra/authentication/authentication.interface';
import BusinessError from '@src/shared/errors/business-error';

@singleton()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('AddressRepository') private readonly addressRepository: IAddressRepository,
    @inject('AuthenticationService') private readonly authenticationService: IAuthenticationService
  ) {}

  async execute(data: CreateUserModel): Promise<UserModel> {
    const userExists = await this.userRepository.findOne({ email: data.email });

    if (userExists) throw new BusinessError('User already registered', { email: data.email });

    const { id } = await this.authenticationService.addUser({ email: data.email, password: data.password });

    const dataToSave: UserModel = {
      id,
      name: data.name,
      email: data.email
    };

    if (data.address) {
      const addressToSave: AddressModel = {
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

    const user = await this.userRepository.save(dataToSave);

    return user;
  }
}
