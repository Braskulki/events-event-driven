import { AuthSession } from '@src/shared/auth.interface';

export interface ISelfDeleteUserUseCase {
  execute(session: AuthSession): Promise<void>;
}
