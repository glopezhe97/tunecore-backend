import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from '../entities/subcategories.entity';
import { Repository } from 'typeorm';
import { SubcategoryResponseDto } from '../dtos/subcategory-response.dto/subcategory-response.dto';
import { Category } from 'src/categories/entities/categories.entity';

@Injectable()
export class SubcategoriesServiceService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getAllSubcategories(): Promise<SubcategoryResponseDto[]> {
    const subcategories = await this.subcategoryRepository.find();
    return subcategories.map((subcategories) => ({
      name: subcategories.name,
    }));
  }
  async getAllSubcategoriesByCategory(
    category: string,
  ): Promise<SubcategoryResponseDto[]> {
    const subcategories = await this.subcategoryRepository.find({
      where: {
        category: {
          name: category,
        },
      },
      relations: {
        category: true,
      },
    });
    return subcategories.map((subcategories) => ({
      name: subcategories.name,
    }));
  }
}
