import { Controller, Get, Param } from '@nestjs/common';
import { SubcategoryResponseDto } from './dtos/subcategory-response.dto/subcategory-response.dto';
import { SubcategoriesServiceService } from './subcategories-service/subcategories-service.service';
@Controller('api/subcategories')
export class SubcategoriesController {
  constructor(private subcategoryService: SubcategoriesServiceService) {}
  @Get()
  async getAllSubcategories(): Promise<SubcategoryResponseDto[]> {
    return await this.subcategoryService.getAllSubcategories();
  }
  @Get(':category')
  async getAllSubcategoriesByCategory(
    @Param('category') categoryName: string,
  ): Promise<SubcategoryResponseDto[]> {
    return this.subcategoryService.getAllSubcategoriesByCategory(categoryName);
  }
}
