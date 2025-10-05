import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class RegisterUserRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  password: string;
}
