import { Module } from '@nestjs/common';
import { CategoriesServiceService } from './categories-service/categories-service.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesServiceService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
