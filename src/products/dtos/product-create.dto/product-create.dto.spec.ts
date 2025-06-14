import { ProductCreateDto } from './product-create.dto';

describe('ProductCreateDto', () => {
  it('should be defined', () => {
    expect(new ProductCreateDto()).toBeDefined();
  });
});
