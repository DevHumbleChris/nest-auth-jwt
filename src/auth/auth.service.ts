import { AuthDTO } from './../dto/auth.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(authDTO: AuthDTO) {
    const { email, password } = authDTO;

    // Check if Email Exists.
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('Email Already Exists');
    }

    const hashedPassword = await this.hashingPassword(password);

    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async signin() {
    return 'signin service';
  }

  async signout() {
    return 'signout service';
  }

  // Hashing Password.
  async hashingPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await Bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
