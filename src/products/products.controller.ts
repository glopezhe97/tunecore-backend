import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dtos/product-response.dto/product-response.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  async getProducts(
    @Query('name') name: string = '',
  ): Promise<ProductResponseDto[]> {
    return this.productService.getProducts(name);
  }
}
