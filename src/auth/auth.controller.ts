import { AuthDTO } from './../dto/auth.dto';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authDTO: AuthDTO) {
    return await this.authService.signup(authDTO);
  }

  @Post('signin')
  async signin() {
    return await this.authService.signin();
  }

  @Get('signout')
  async Signout() {
    return await this.authService.signout();
  }
}
