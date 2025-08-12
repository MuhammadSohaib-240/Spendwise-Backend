import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export class RegisterResponse {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
