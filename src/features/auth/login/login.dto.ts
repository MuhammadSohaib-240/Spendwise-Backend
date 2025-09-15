import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/features/user/roles.enum';

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  accessToken: string;
  expiredAt: number; // Unix timestamp in milliseconds
  user: LoginUserResponse;

  constructor(token: string, expiredAt: number, user: LoginUserResponse) {
    this.accessToken = token;
    this.expiredAt = expiredAt;
    this.user = user;
  }
}

export class LoginUserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;

  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    role: string,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}
