/* eslint-disable prettier/prettier */
import { AuthDTO } from './../dto/auth.dto';
import { Injectable, BadRequestException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import{ Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService ) {}
  async signup(authDTO: AuthDTO, req: Request, res: Response) {
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

    // Hashed Password.
    const hashedPassword = await this.hashingPassword(password);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (!createdUser) {
      throw new InternalServerErrorException();
    }

    const token = await this.signToken({ id: createdUser.id, email: createdUser.email })

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token, {})

    return res.send({
      message: 'Signed up Successfully!'
    })
  }

  async signin(authDTO: AuthDTO, req: Request, res: Response) {
    const { email, password } = authDTO;

    // Check if Email Exists.
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('Email Does Not Exists');
    }

    const isMatch = await this.comparePassword({
      password,
      hashedPassword: user.password,
    });

    if (!isMatch) {
      throw new BadRequestException('Passowrd Incorrect!');
    }

    const token = await this.signToken({ id: user.id, email: user.email })

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token, {})

    return res.send({
      message: 'Logged in Successfully!'
    })
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token')

    return res.send({
      message: 'Signed out Successfully!'
    })
  }

  // Hashing Password.
  async hashingPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await Bcrypt.hash(password, saltRounds);
  }

  // Compare Passwords.
  async comparePassword(args: { password: string; hashedPassword: string }) {
    const { password, hashedPassword } = args;
    return await Bcrypt.compare(password, hashedPassword);
  }

  // Sign Tokens.
  async signToken(args: { id: string; email: string }) {
    const payload = args
    return await this.jwt.sign(payload, { secret: jwtSecret })
  }
}
