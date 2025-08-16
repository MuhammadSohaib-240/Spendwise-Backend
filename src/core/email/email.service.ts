import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(to: string, resetLink: string) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Reset Your Spendwise Password</h2>
        <p>Hi there,</p>
        <p>We received a request to reset your password for your Spendwise account.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="
               background-color: #4CAF50;
               color: white;
               padding: 12px 24px;
               text-decoration: none;
               border-radius: 5px;
               display: inline-block;
             ">
             Reset Password
          </a>
        </p>
        <p>If you didn’t request a password reset, please ignore this email. Your account is safe.</p>
        <p>Thanks,<br/>The Spendwise Team</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">
          This is an automated message, please do not reply.
        </p>
      </div>
    `;

    await this.mailerService.sendMail({
      to,
      subject: 'Reset Your Spendwise Password',
      html: htmlContent,
    });
  }
}
