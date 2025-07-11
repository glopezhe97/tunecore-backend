import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
export class ProductCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @IsOptional()
  isOnSale?: boolean;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  img_url: string;

  @IsString()
  brand_name: string;

  @IsString()
  category_name: string;

  @IsString()
  subcategory_name: string;
}
