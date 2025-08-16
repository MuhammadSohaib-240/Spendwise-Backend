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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [RegisterEndpoint, LoginEndpoint],
  providers: [JwtTokenService, JwtStrategy, RegisterHandler, LoginHandler],
})
export class AuthModule {}
