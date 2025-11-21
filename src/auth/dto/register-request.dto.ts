import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'Password must be at least 8 characters long, contain at least one uppercase letter and one digit',
  })
  password: string;

  @IsNotEmpty()
  nickname: string;

  profilePictureName?: string;
}
