import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from './forgot-password.dto';
import { EmailService } from '../../../core/email/email.service';
import * as crypto from 'crypto';
import { UserRepository } from 'src/features/user/user.repository';

@Injectable()
export class ForgotPasswordHandler {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  async execute(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      const user = await this.userRepo.findByEmail(req.email);
      if (!user) throw new NotFoundException('User not found');

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 15);

      await this.userRepo.setResetToken(user.id, resetToken, resetTokenExpiry);

      const resetUrl = `${process.env.RESET_PASSWORD_URL}?token=${resetToken}&email=${user.email}`;

      await this.emailService.sendResetPasswordEmail(user.email, resetUrl);

      return { message: 'Password reset email sent successfully' };
    } catch (err) {
      console.error('ForgotPasswordHandler error:', err);
      throw err;
    }
  }
}
