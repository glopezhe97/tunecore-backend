import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  private products: Product[];

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Get all products
  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProductById(product_id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ product_id });
  }
}
