import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductResponseDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  @IsOptional()
  isOnSale?: boolean;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  img_url: string[];

  @IsArray()
  @IsInt()
  disposition: number[];

  @IsString()
  brand_name: string;

  @IsArray()
  @IsString({ each: true })
  product_type_names: string[];

  @IsString()
  category_name: string;

  @IsString()
  subcategory_name: string;
}
