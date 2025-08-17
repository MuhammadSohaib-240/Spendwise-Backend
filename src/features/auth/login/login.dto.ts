import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  accessToken: string;
  expiredAt: number; // Unix timestamp in milliseconds

  constructor(token: string, expiredAt: number) {
    this.accessToken = token;
    this.expiredAt = expiredAt;
  }
}
