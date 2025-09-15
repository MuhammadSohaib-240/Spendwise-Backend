import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async setResetToken(
    userId: number,
    token: string,
    expiry: Date,
  ): Promise<void> {
    await this.repo.update(userId, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.repo.save(this.repo.create(user));
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }
}
