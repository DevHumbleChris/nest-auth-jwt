import { AuthDTO } from './../dto/auth.dto';
import { Controller, Post, Get, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authDTO: AuthDTO, @Req() req, @Res() res) {
    return await this.authService.signup(authDTO, req, res);
  }

  @Post('signin')
  async signin(@Body() authDTO: AuthDTO, @Req() req, @Res() res) {
    return await this.authService.signin(authDTO, req, res);
  }

  @Get('signout')
  async Signout(@Req() req, @Res() res) {
    return await this.authService.signout(req, res);
  }
}
