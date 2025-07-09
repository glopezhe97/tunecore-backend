import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/categories.entity';
import { CategoryResponseDto } from '../dtos/category-response.dto/category-response.dto';
@Injectable()
export class CategoriesServiceService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getAllCategories(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map((category) => ({
      name: category.name,
      image: category.image,
    }));
  }
}
