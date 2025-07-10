import { Module } from '@nestjs/common';
import { SubcategoriesServiceService } from './subcategories-service/subcategories-service.service';
import { SubcategoriesController } from './subcategories.controller';
import { Subcategory } from './entities/subcategories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory, Category])],
  providers: [SubcategoriesServiceService],
  controllers: [SubcategoriesController],
})
export class SubcategoriesModule {}
