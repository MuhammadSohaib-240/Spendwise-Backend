import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from '../../../core/security/jwt/jwt.service';
import { LoginRequest, LoginResponse, LoginUserResponse } from './login.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class LoginHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(req: LoginRequest): Promise<LoginResponse> {
    if (!req?.email || !req?.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    let user: User | null = null;
    try {
      user = await this.userRepo.findOne({ where: { email: req.email } });
    } catch (err) {
      throw new InternalServerErrorException('Unable to process request');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(req.password, user.password);
    } catch (err) {
      throw new InternalServerErrorException('Unable to process request');
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    let token: string;
    let expiredAt: number;
    try {
      ({ token, expiredAt } = this.jwtTokenService.sign({
        sub: user.id,
        username: user.username,
      }));
    } catch (err) {
      throw new InternalServerErrorException('Token generation failed');
    }

    return new LoginResponse(
      token,
      expiredAt, // already a number in ms
      new LoginUserResponse(
        user.id,
        user.name,
        user.username,
        user.email,
        user.role.toString(),
      ),
    );
  }
}
