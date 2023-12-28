export interface IAuthenticationService {
  addUser(user: { email: string; password: string }): Promise<{ id: string }>;
  updateUser(data: { id: string; newEmail?: string }): Promise<void>;
  updatePassword(user: { id: string; password: string }): Promise<void>;
  delete(userId: string): Promise<void>;
}
