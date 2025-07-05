import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dtos/product-response.dto/product-response.dto';
// import { ProductCreateDto } from './dtos/product-create.dto/product-create.dto';
import { Brand } from 'src/brands/entities/brands.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { Subcategory } from 'src/subcategories/entities/subcategories.entity';
import { ProductCategorySubcategory } from 'src/productcategorysubcategory/entities/product-category-subcategory.entity';
import { ProductProductType } from 'src/product-type/entities/product-product-type/product-product-type';
import { Images } from 'src/images/entities/images.entity/images.entity';
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
    @InjectRepository(ProductProductType)
    private productProductTypeRepository: Repository<ProductProductType>,
    @InjectRepository(Images)
    private imagesRepository: Repository<Images>,
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
      .leftJoin(
        'Product_productType',
        'productProductType',
        'productProductType.product_id = product.product_id',
      )
      .leftJoin(
        'ProductType',
        'productType',
        'productType.productType_id = productProductType.productType_id',
      )
      .leftJoin('Images', 'images', 'images.product_id = product.product_id')
      .select([
        'product.name AS name',
        'product.price AS price',
        'product.isOnSale AS isOnSale',
        'product.stock AS stock',
        'product.featured AS featured',
        'product.description AS description',
        'GROUP_CONCAT(DISTINCT images.route) AS img_url',
        'brand.name AS brand_name',
        'category.name AS category_name',
        'subcategory.name AS subcategory_name',
        'GROUP_CONCAT(DISTINCT productType.name) AS product_type_names',
      ])
      .groupBy('product.product_id')
      .addGroupBy('brand.name')
      .addGroupBy('category.name')
      .addGroupBy('subcategory.name');
    if (name.length > 0) {
      query.where('LOWER(product.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    //Put in products/dtos
    interface RawProductResult {
      name: string;
      price: string | number;
      isOnSale: number;
      stock: string | number;
      featured: boolean;
      description: string;
      img_url: string;
      brand_name: string;
      category_name: string;
      subcategory_name: string;
      product_type_names: string | null;
    }

    const rawProducts = await query.getRawMany<RawProductResult>();

    return rawProducts.map(
      (product): ProductResponseDto => ({
        name: product.name,
        price: Number(product.price),
        isOnSale: Boolean(product.isOnSale),
        featured: Boolean(product.featured),
        stock: Number(product.stock),
        description: product.description,
        img_url: product.img_url?.split(',') ?? [], // Split img_url from RawProducts
        brand_name: product.brand_name,
        category_name: product.category_name,
        subcategory_name: product.subcategory_name,
        product_type_names: product.product_type_names?.split(',') ?? [], // Split product_type_names from RawProducts
      }),
    );
  }

  // async createProduct(productCreateDto: ProductCreateDto): Promise<Product> {
  //   try {
  //     // Search brand ID by name
  //     const brand = await this.brandRepository.findOne({
  //       where: { name: productCreateDto.brand_name },
  //     });
  //     if (!brand) throw new NotFoundException('Brand not found');

  //     console.log(brand);
  //     // Search Category
  //     const category = await this.categoryRepository.findOne({
  //       where: { name: productCreateDto.category_name },
  //     });
  //     console.log(category);
  //     // Search Subcategory
  //     const subcategory = await this.subcategoryRepository.findOne({
  //       where: { name: productCreateDto.subcategory_name },
  //     });
  //     if (!category) throw new NotFoundException('Category not found');
  //     if (!subcategory) throw new NotFoundException('Subcategory not found');
  //     console.log(subcategory);
  //     // Create product
  //     const newProduct: Product = this.productRepository.create({
  //       name: productCreateDto.name,
  //       price: productCreateDto.price,
  //       isOnSale: productCreateDto.isOnSale ?? false,
  //       stock: productCreateDto.stock,
  //       description: productCreateDto.description ?? '',
  //       img_url: productCreateDto.img_url,
  //       brand,
  //     });
  //     //Save product at DDBB
  //     const saveNewProduct = await this.productRepository.save(newProduct);
  //     // Insert productCategorySubcategory
  //     await this.productCategorySubcategoryRepository.save({
  //       product_id: saveNewProduct.product_id,
  //       category_id: category.category_id,
  //       subcategory_id: subcategory.subcategory_id,
  //     });
  //     return saveNewProduct;
  //   } catch (err) {
  //     console.error('Create product error:', err);
  //     throw err instanceof Error ? err : new Error('Unexpected error');
  //   }
  // }
}
