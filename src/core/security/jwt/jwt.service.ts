import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: any): { token: string; expiredAt: number } {
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    });

    // Decode the token to get the expiration time
    const decoded = this.jwtService.decode(token) as { exp: number };
    // Convert to milliseconds (JWT exp is in seconds)
    const expiredAt = decoded.exp * 1000;

    return { token, expiredAt };
  }

  verify(token: string): any {
    return this.jwtService.verify(token, { secret: jwtConstants.secret });
  }
}
