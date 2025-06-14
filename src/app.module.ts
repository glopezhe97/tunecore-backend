import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Brand } from './products/entities/brand.entity';
import { Category } from './products/entities/category.entity';
import { Subcategory } from './products/entities/subcategory.entity';
import { ProductCategorySubcategory } from './products/entities/product-category-subcategory.entity';
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
        ],
        synchronize: true,
      }),
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
