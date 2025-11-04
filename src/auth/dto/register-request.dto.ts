import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'Password must be at least 8 characters long, contain at least one uppercase letter and one digit',
  })
  password: string;
}
