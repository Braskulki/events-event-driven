import { CreateUserModel, UpdateUserModel } from '@src/domain/models/user.model';
import { z } from 'zod';

export function createUserValidation(data: CreateUserModel): void {
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(5),
    address: z.object({
      street: z.string(),
      number: z.string(),
      complement: z.string().optional(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string()
    }).optional()
  });

  schema.parse(data);
}

export function updateUserValidation(data: UpdateUserModel): void {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    address: z.object({
      street: z.string(),
      number: z.string(),
      complement: z.string().optional(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string()
    }).optional()
  });

  schema.parse(data);
}
