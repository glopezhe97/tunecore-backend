export interface RawProductResultDto {
  name: string;
  price: string | number;
  isOnSale: number;
  stock: string | number;
  featured: boolean;
  description: string;
  img_url: string;
  disposition: string;
  brand_name: string;
  category_name: string;
  subcategory_name: string;
  product_type_names: string | null;
}
