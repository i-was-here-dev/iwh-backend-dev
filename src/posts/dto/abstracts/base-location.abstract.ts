import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export abstract class BaseLocationDto {
  @IsLatitude()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
