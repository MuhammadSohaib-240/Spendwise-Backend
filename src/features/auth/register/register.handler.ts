import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterRequest, RegisterResponse } from './register.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class RegisterHandler {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async execute(req: RegisterRequest): Promise<RegisterResponse> {
    await this.validate(req);

    const existingUser = await this.userRepo.findOne({
      where: { email: req.email },
    });
    if (existingUser) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(req.password, 10);

    const user = this.userRepo.create({
      name: req.name,
      username: req.username,
      email: req.email,
      password: hashedPassword,
    });

    await this.userRepo.save(user);
    return new RegisterResponse('User registered successfully');
  }

  private async validate(req: RegisterRequest): Promise<void> {
    // Required fields
    if (!req.username?.trim()) {
      throw new BadRequestException('Username is required');
    }
    if (!req.email?.trim()) {
      throw new BadRequestException('Email is required');
    }
    if (!req.password?.trim()) {
      throw new BadRequestException('Password is required');
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Password strength
    if (req.password.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters long',
      );
    }
    if (!/[A-Z]/.test(req.password)) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter',
      );
    }
    if (!/[0-9]/.test(req.password)) {
      throw new BadRequestException(
        'Password must contain at least one number',
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(req.password)) {
      throw new BadRequestException(
        'Password must contain at least one special character',
      );
    }

    // Unique username
    const existingUsername = await this.userRepo.findOne({
      where: { username: req.username.trim() },
    });
    if (existingUsername) {
      throw new ConflictException('Username already taken');
    }

    // Unique email
    const existingEmail = await this.userRepo.findOne({
      where: { email: req.email.trim().toLowerCase() },
    });
    if (existingEmail) {
      throw new ConflictException('Email already registered');
    }
  }
}
