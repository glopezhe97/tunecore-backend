import { Module } from '@nestjs/common';
import { SubcategoriesServiceService } from './subcategories-service/subcategories-service.service';
import { SubcategoriesController } from './subcategories.controller';
import { Subcategory } from './entities/subcategories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory])],
  providers: [SubcategoriesServiceService],
  controllers: [SubcategoriesController],
})
export class SubcategoriesModule {}
