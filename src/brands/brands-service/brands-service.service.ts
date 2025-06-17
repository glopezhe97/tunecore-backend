import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brands.entity';
import { Repository } from 'typeorm';
import { BrandsResponseDto } from '../dtos/brands-response.dto/brands-response.dto';

@Injectable()
export class BrandsServiceService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}
  async getAllBrands(): Promise<BrandsResponseDto[]> {
    const brands = await this.brandRepository.find();
    return brands.map((brands) => ({
      name: brands.name,
    }));
  }
}
