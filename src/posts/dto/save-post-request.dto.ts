import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class SavePostRequestDto {
  @IsLatitude()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @MaxLength(20)
  @IsNotEmpty()
  title: string;

  @MaxLength(200)
  @IsNotEmpty()
  body: string;

  imageName?: string;

  videoName?: string;
}
