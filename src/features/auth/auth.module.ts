import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../../core/security/jwt/jwt.constants';
import { JwtTokenService } from '../../core/security/jwt/jwt.service';
import { JwtStrategy } from '../../core/security/jwt/jwt.strategy';
import { RegisterEndpoint } from './register/register.endpoint';
import { LoginEndpoint } from './login/login.endpoint';
import { RegisterHandler } from './register/register.handler';
import { LoginHandler } from './login/login.handler';
import { User } from '../user/user.entity';
import { ForgotPasswordEndpoint } from './forgot-password/forgot-password.endpoint';
import { ForgotPasswordHandler } from './forgot-password/forgot-password.handler';
import { UserModule } from '../user/user.module';
import { EmailModule } from 'src/core/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    UserModule,
    EmailModule
  ],
  controllers: [RegisterEndpoint, LoginEndpoint, ForgotPasswordEndpoint],
  providers: [JwtTokenService, JwtStrategy, RegisterHandler, LoginHandler, ForgotPasswordHandler],
})
export class AuthModule {}
