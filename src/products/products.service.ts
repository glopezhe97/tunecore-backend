import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dtos/product-response.dto/product-response.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Get all products
  async getProducts(name: string = ''): Promise<ProductResponseDto[]> {
    const products =
      name.length > 0
        ? await this.productRepository.find({
            where: { name: ILike(`%${name}%`) },
          })
        : await this.productRepository.find();

    // Transformar entidades a DTOs
    return products.map((product) => ({
      name: product.name,
      price: product.price,
      isOnSale: product.isOnSale,
      stock: product.stock,
      description: product.description,
      img_url: product.img_url,
    }));
  }
}

// getProductById(product_id: number): Promise<Product | null> {
//   return this.productRepository.findOneBy({ product_id });
//}
