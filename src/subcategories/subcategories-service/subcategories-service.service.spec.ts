import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesServiceService } from './subcategories-service.service';

describe('SubcategoriesServiceService', () => {
  let service: SubcategoriesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcategoriesServiceService],
    }).compile();

    service = module.get<SubcategoriesServiceService>(SubcategoriesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
