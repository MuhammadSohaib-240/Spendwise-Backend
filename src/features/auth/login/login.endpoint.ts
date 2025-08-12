import { Body, Controller, Post } from '@nestjs/common';
import { AUTH_ROUTES } from '../auth-routes';
import { LoginRequest, LoginResponse } from './login.dto';
import { LoginHandler } from './login.handler';

@Controller(AUTH_ROUTES.LOGIN)
export class LoginEndpoint {
  constructor(private readonly handler: LoginHandler) {}

  @Post()
  async login(@Body() req: LoginRequest): Promise<LoginResponse> {
    return this.handler.execute(req);
  }
}
