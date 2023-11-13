import { User } from '@/users/schema/user.schema';

export interface ICreateActivationToken {
  activationToken: string;
  activationCode: number;
}

export interface IRegisterResponse {
  activationToken: string;
}

export interface IActivationPayload {
  activationCode: number;
  user: User;
}

export interface IActivateUserResponse {
  message: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}