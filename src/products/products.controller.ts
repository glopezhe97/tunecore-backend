import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dtos/product-response.dto/product-response.dto';
// import { ProductCreateDto } from './dtos/product-create.dto/product-create.dto';
// import { Product } from './entities/product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  async getAllProducts(
    @Query('name') name: string = '',
  ): Promise<ProductResponseDto[]> {
    return this.productService.getAllProducts(name);
  }

  @Get(':subcategory/by-type/:type')
  async getAllProductsByType(
    @Param('type') type: string,
    @Param('subcategory') subcategory: string,
  ): Promise<ProductResponseDto[]> {
    return this.productService.getAllProductsByType(type, subcategory);
  }

  // @Post()
  // async createProduct(
  //   @Body() productCreateDto: ProductCreateDto,
  // ): Promise<Product> {
  //   return this.productService.createProduct(productCreateDto);
  // }
}
