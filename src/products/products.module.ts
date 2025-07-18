import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/categories.entity';
import { Brand } from 'src/brands/entities/brands.entity';
import { Subcategory } from 'src/subcategories/entities/subcategories.entity';
import { ProductCategorySubcategory } from 'src/productcategorysubcategory/entities/product-category-subcategory.entity';
import { ProductProductType } from 'src/product-type/entities/product-product-type/product-product-type';
import { Type } from 'src/type/entities/type.entity';
import { Images } from 'src/images/entities/images.entity/images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Brand,
      Category,
      Subcategory,
      ProductCategorySubcategory,
      ProductProductType,
      Type,
      Images,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
