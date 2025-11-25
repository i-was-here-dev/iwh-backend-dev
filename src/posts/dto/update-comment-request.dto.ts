import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class UpdateCommentRequestDto {
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  body: string;
}
