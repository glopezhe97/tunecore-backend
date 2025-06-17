import { Controller, Get } from '@nestjs/common';
import { BrandsServiceService } from './brands-service/brands-service.service';
import { BrandsResponseDto } from './dtos/brands-response.dto/brands-response.dto';

@Controller('api/brands')
export class BrandsController {
  constructor(private brandService: BrandsServiceService) {}
  @Get()
  async getAllBrands(): Promise<BrandsResponseDto[]> {
    return await this.brandService.getAllBrands();
  }
}
