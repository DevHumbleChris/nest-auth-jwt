/* eslint-disable prettier/prettier */
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30, { message: 'Password should be between 6 - 30 characters.' })
  public password: string;
}
