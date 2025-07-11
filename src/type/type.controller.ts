import { Controller, Get, Param } from '@nestjs/common';
import { TypeServiceService } from './type-service/type-service/type-service.service';
import { TypeDto } from './dto/type.dto/type.dto';

@Controller('api/type/:subcategory')
export class TypeController {
  constructor(private typeService: TypeServiceService) {}
  @Get()
  async getAllTypes(
    @Param('subcategory') subcategory: string,
  ): Promise<TypeDto[]> {
    return await this.typeService.getAllTypes(subcategory);
  }
}
