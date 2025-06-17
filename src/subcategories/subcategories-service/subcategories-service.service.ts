import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from '../entities/subcategories.entity';
import { Repository } from 'typeorm';
import { SubcategoryResponseDto } from '../dtos/subcategory-response.dto/subcategory-response.dto';

@Injectable()
export class SubcategoriesServiceService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}
  async getAllSubcategories(): Promise<SubcategoryResponseDto[]> {
    const subcategories = await this.subcategoryRepository.find();
    return subcategories.map((subcategories) => ({
      name: subcategories.name,
    }));
  }
}
