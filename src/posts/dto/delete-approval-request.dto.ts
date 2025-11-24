import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteApprovalRequestDto {
  @IsLatitude()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
