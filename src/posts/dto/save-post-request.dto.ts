import { IsNotEmpty, MaxLength } from 'class-validator';

export class SavePostRequestDto {
  @MaxLength(20)
  @IsNotEmpty()
  title: string;

  @MaxLength(200)
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  location: string;

  imageName?: string;

  videoName?: string;
}
