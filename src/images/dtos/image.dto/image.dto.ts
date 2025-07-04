import { IsInt, IsPositive, IsString } from 'class-validator';
export class ImageDto {
  @IsInt()
  image_id: number;

  @IsInt()
  product_id: number;

  @IsString()
  route: string;

  @IsInt()
  @IsPositive()
  disposition: number;
}
