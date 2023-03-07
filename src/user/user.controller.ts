import { JwtAuthGuard } from './../auth/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return {
      message: 'user',
    };
  }
}
