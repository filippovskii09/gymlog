import { User } from './interface.interface';

export interface RegisterDto extends Record<string, unknown> {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface LoginDto extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface LogoutDto {
  userId: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface GenericMessageResponse {
  message: string;
}
