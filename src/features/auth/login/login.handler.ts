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
    try {
      const user = await this.userRepo.findOne({ where: { email: req.email } });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isPasswordValid = await bcrypt.compare(req.password, user.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Incorrect email or password');

      const { token, expiredAt } = this.jwtTokenService.sign({
        sub: user.id,
        username: user.username,
      });

      return new LoginResponse(
        token,
        expiredAt,
        new LoginUserResponse(
          user.id,
          user.name,
          user.username,
          user.email,
          user.role.toString(),
        ),
      );
    } catch (exception) {
      throw new InternalServerErrorException(
        'Login failed due to internal server error',
      );
    }
  }
}
