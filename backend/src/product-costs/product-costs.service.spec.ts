import { Test, TestingModule } from '@nestjs/testing';
import { ProductCostsService } from './product-costs.service';

describe('ProductCostsService', () => {
  let service: ProductCostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCostsService],
    }).compile();

    service = module.get<ProductCostsService>(ProductCostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
