import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Brand } from './brands/entities/brands.entity';
import { Category } from './categories/entities/categories.entity';
import { Subcategory } from './subcategories/entities/subcategories.entity';
import { ProductCategorySubcategory } from './productcategorysubcategory/entities/product-category-subcategory.entity';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ProductcategorysubcategoryModule } from './productcategorysubcategory/productcategorysubcategory.module';
import { TypeModule } from './type/type.module';
import { Type } from './type/entities/type.entity';
import { ProductProductType } from './product-type/entities/product-product-type/product-product-type';
import { ImagesModule } from './images/images.module';
import { Images } from './images/entities/images.entity/images.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Lee .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DATABASE_HOST'),
        port: parseInt(config.getOrThrow('DATABASE_PORT'), 10),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [
          Product,
          Brand,
          Category,
          Subcategory,
          ProductCategorySubcategory,
          Type,
          ProductProductType,
          Images,
        ],
        synchronize: true,
      }),
    }),
    ProductsModule,
    BrandsModule,
    BrandsModule,
    CategoriesModule,
    SubcategoriesModule,
    ProductcategorysubcategoryModule,
    TypeModule,
    ProductProductType,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
