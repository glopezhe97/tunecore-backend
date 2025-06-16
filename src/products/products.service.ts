import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dtos/product-response.dto/product-response.dto';
import { ProductCreateDto } from './dtos/product-create.dto/product-create.dto';
import { Brand } from 'src/brands/entities/brands.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { Subcategory } from 'src/subcategories/entities/subcategories.entity';
import { ProductCategorySubcategory } from 'src/productcategorysubcategory/entities/product-category-subcategory.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(ProductCategorySubcategory)
    private productCategorySubcategoryRepository: Repository<ProductCategorySubcategory>,
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
      query.where('LOWER(product.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
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

  async createProduct(productCreateDto: ProductCreateDto): Promise<Product> {
    try {
      // Search brand ID by name
      const brand = await this.brandRepository.findOne({
        where: { name: productCreateDto.brand_name },
      });
      if (!brand) throw new NotFoundException('Brand not found');

      console.log(brand);
      // Search Category
      const category = await this.categoryRepository.findOne({
        where: { name: productCreateDto.category_name },
      });
      console.log(category);
      // Search Subcategory
      const subcategory = await this.subcategoryRepository.findOne({
        where: { name: productCreateDto.subcategory_name },
      });
      console.log(subcategory);
      // Create product
      const newProduct: Product = this.productRepository.create({
        name: productCreateDto.name,
        price: productCreateDto.price,
        isOnSale: productCreateDto.isOnSale ?? false,
        stock: productCreateDto.stock,
        description: productCreateDto.description ?? '',
        img_url: productCreateDto.img_url,
        brand,
      });
      //Save product at DDBB
      const saveNewProduct = await this.productRepository.save(newProduct);
      // Insert productCategorySubcategory
      await this.productCategorySubcategoryRepository.save({
        product_id: saveNewProduct.product_id,
        category_id: category.category_id,
        subcategory_id: subcategory.subcategory_id,
      });
      return saveNewProduct;
    } catch (err) {
      console.log(err.message);
      return err;
    }
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
