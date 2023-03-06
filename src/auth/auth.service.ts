import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  //   constructor() {}
  async signup() {
    return { message: 'signup service' };
  }

  async signin() {
    return 'signin service';
  }

  async signout() {
    return 'signout service';
  }
}
