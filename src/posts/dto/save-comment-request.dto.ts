import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export class SaveCommentRequestDto {
  @IsNotEmpty()
  body: string;

  @IsLatitude()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
