import { Body, Controller, Post } from '@nestjs/common';
import { AUTH_ROUTES } from '../auth-routes';
import { ForgotPasswordRequest, ForgotPasswordResponse } from './forgot-password.dto';
import { ForgotPasswordHandler } from './forgot-password.handler';
import { Public } from 'src/core/security/jwt/jwt-auth-guards/public.decorator';

@Controller(AUTH_ROUTES.FORGOT_PASSWORD)
export class ForgotPasswordEndpoint {
  constructor(private readonly handler: ForgotPasswordHandler) {}

  @Public()
  @Post()
  async forgotPassword(
    @Body() req: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    return this.handler.execute(req);
  }
}
