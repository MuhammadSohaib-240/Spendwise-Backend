import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/security/jwt/jwt-auth-guards/jwt.auth.guard';
import { RolesGuard } from 'src/core/security/jwt/jwt-auth-guards/roles.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Roles } from 'src/core/security/jwt/jwt-auth-guards/roles.decorator';
import { Role } from './roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile() {
    return { msg: 'Only logged-in users can access this' };
  }

  @Roles(Role.ADMIN)
  @Get('admin')
  getAdminPanel() {
    return { msg: 'Only admins can access this' };
  }
}
