import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeDto } from 'src/type/dto/type.dto/type.dto';
import { Type } from 'src/type/entities/type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeServiceService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}
  async getAllTypes(subcategory: string): Promise<TypeDto[]> {
    const type = await this.typeRepository.find({
      where: {
        subcategory: {
          name: subcategory,
        },
      },
      relations: {
        subcategory: true,
      },
    });
    return type.map((types) => ({
      name: types.name,
    }));
  }
}
