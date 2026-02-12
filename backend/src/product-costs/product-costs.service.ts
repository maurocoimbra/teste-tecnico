import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCT_COST_REPOSITORY } from './repositories/product-cost.repository';
import type { ProductCostRepository } from './repositories/product-cost.repository';
import { PRODUCT_REPOSITORY } from '../products/repositories/product.repository';
import type { ProductRepository } from '../products/repositories/product.repository';

@Injectable()
export class ProductCostsService {
  constructor(
    @Inject(PRODUCT_COST_REPOSITORY)
    private readonly costRepo: ProductCostRepository,

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
  ) {}

  async upsert(productId: string, cost: number) {
    const exists = await this.productRepo.exists(productId);
    if (!exists) throw new NotFoundException('Product not found');

    return this.costRepo.upsert(productId, cost);
  }

  async findAll() {
    return this.costRepo.findAll();
  }

  async findByProductId(productId: string) {
    return this.costRepo.findByProductId(productId);
  }

  async findByProductIds(productIds: string[]) {
    if (productIds.length === 0) return [];
    return this.costRepo.findByProductIds(productIds);
  }
}

