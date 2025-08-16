import { Body, Controller, Post } from '@nestjs/common';
import { AUTH_ROUTES } from '../auth-routes';
import { RegisterRequest, RegisterResponse } from './register.dto';
import { RegisterHandler } from './register.handler';
import { Public } from 'src/core/security/jwt/jwt-auth-guards/public.decorator';

@Controller(AUTH_ROUTES.REGISTER)
export class RegisterEndpoint {
  constructor(private readonly handler: RegisterHandler) {}

  @Public()
  @Post()
  async register(@Body() req: RegisterRequest): Promise<RegisterResponse> {
    return this.handler.execute(req);
  }
}
