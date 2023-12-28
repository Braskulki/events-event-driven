import {
  CreateUserUseCase,
  ICreateUserUseCase,
  ISelfDeleteUserUseCase,
  IUpdateUserUseCase,
  SelfDeleteUserUseCase,
  UpdateUserUseCase
} from '@src/domain/use-cases/user';
import { createUserValidation, updateUserValidation } from '@src/domain/validators/user.validators';
import { CreateUserModel, UpdateUserModel, UserModel } from '@src/domain/models/user.model';
import { Body, Delete, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers';
import { container, inject, singleton } from 'tsyringe';
import authenticate from '../middlewares/authenticate';
import { Request, Response } from 'express';
import httpStatus from 'http-status';


@singleton()
@JsonController('/user')
export class UserController {
  constructor(
    @inject('CreateUserUseCase') private readonly createUserUseCase: ICreateUserUseCase,
    @inject('UpdateUserUseCase') private readonly updateUserUseCase: IUpdateUserUseCase,
    @inject('SelfDeleteUserUseCase') private readonly selfDeleteUserUseCase: ISelfDeleteUserUseCase
  ) {
    this.createUserUseCase = container.resolve<CreateUserUseCase>('CreateUserUseCase');
    this.updateUserUseCase = container.resolve<UpdateUserUseCase>('UpdateUserUseCase');
    this.selfDeleteUserUseCase = container.resolve<SelfDeleteUserUseCase>('SelfDeleteUserUseCase');
  }

  @Post('')
  async create(@Body() body: CreateUserModel): Promise<UserModel> {
    createUserValidation(body);

    const user = await this.createUserUseCase.execute(body);

    return user;
  }

  @Put('')
  @UseBefore(authenticate)
  async update(@Body() body: UpdateUserModel, @Req() req: Request): Promise<UserModel> {
    updateUserValidation(body);
    const user = await this.updateUserUseCase.execute(body, req.session);

    return user;
  }

  @Delete('')
  @UseBefore(authenticate)
  async delete(@Req() req: Request, @Res() res: Response): Promise<Response> {
    await this.selfDeleteUserUseCase.execute(req.session);
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

}
