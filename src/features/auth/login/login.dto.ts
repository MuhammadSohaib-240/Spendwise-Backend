import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
