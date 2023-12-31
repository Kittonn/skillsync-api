import { User } from '@/modules/users/schema/user.schema';

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

export interface ILogoutResponse {
  message: string;
}

export interface ICreateToken {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
