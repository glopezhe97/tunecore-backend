import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dtos/product-response.dto/product-response.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Get all products
  async getAllProducts(name: string = ''): Promise<ProductResponseDto[]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.brand', 'brand')
      .leftJoin(
        'Product_category_subcategory',
        'pcs',
        'pcs.product_id = product.product_id',
      )
      .leftJoin(
        'Category',
        'category',
        'category.category_id = pcs.category_id',
      )
      .leftJoin(
        'Subcategory',
        'subcategory',
        'subcategory.subcategory_id = pcs.subcategory_id',
      )
      .select([
        'product.name AS name',
        'product.price AS price',
        'product.isOnSale AS isOnSale',
        'product.stock AS stock',
        'product.description AS description',
        'product.img_url AS img_url',
        'brand.name AS brand_name',
        'category.name AS category_name',
        'subcategory.name AS subcategory_name',
      ]);
    if (name.length > 0) {
      query.where('product.name ILIKE :name', { name: `%${name}%` });
    }
    const rawProducts = await query.getRawMany();
    return rawProducts.map((product: ProductResponseDto) => ({
      name: product.name,
      price: product.price,
      isOnSale: product.isOnSale,
      stock: product.stock,
      description: product.description,
      img_url: product.img_url,
      brand_name: product.brand_name,
      category_name: product.category_name,
      subcategory_name: product.subcategory_name,
    }));
  }
}
// async getProducts(name: string = ''): Promise<ProductResponseDto[]> {
//   const products =
//     name.length > 0
//       ? await this.productRepository.find({
//           where: { name: ILike(`%${name}%`) },
//         })
//       : await this.productRepository.find();

//   // Transformar entidades a DTOs
//   return products.map((product) => ({
//     name: product.name,
//     price: product.price,
//     isOnSale: product.isOnSale,
//     stock: product.stock,
//     description: product.description,
//     img_url: product.img_url,
//   }));
// }
