import { Test, TestingModule } from '@nestjs/testing';
import { BrandsServiceService } from './brands-service.service';

describe('BrandsServiceService', () => {
  let service: BrandsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsServiceService],
    }).compile();

    service = module.get<BrandsServiceService>(BrandsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
