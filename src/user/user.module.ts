import { JwtStrategy } from './../auth/jwt.strategy';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
