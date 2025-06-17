import { Controller, Get } from '@nestjs/common';
import { CategoriesServiceService } from './categories-service/categories-service.service';
// import { Category } from './entities/categories.entity';
import { CategoryResponseDto } from './dtos/category-response.dto/category-response.dto';
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesServiceService) {}
  @Get()
  async getAllCategories(): Promise<CategoryResponseDto[]> {
    return await this.categoriesService.getAllCategories();
  }
}
