import { IsNumber, Min, Max } from 'class-validator';
import { BaseLocationDto } from './abstracts/base-location.abstract';

export class FindPostsInBoundingBoxRequestDto extends BaseLocationDto {
  @IsNumber()
  @Min(0.001)
  @Max(0.1)
  boxWidth: number;

  @IsNumber()
  @Min(0.001)
  @Max(0.1)
  boxLength: number;
}
