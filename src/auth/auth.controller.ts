import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup() {
    return 'Signup route';
  }

  @Post('signin')
  async signin() {
    return 'Signin route';
  }

  @Get('signout')
  async Signout() {
    return 'Signout route';
  }
}
